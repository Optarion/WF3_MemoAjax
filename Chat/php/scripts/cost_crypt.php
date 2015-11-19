<?php

if(!function_exists('hash_equals')) {
	function hash_equals($str1, $str2) {
		if(strlen($str1) != strlen($str2)) {
			return false;
		} else {
			$res = $str1 ^ $str2;
			$ret = 0;
			for($i = strlen($res) - 1; $i >= 0; $i--) $ret |= ord($res[$i]);
			return !$ret;
		}
	}
}

if (!function_exists('password_hash')) {
	function password_hash($pass, $algo = 1, $options = array()) {

		$rounds = !empty($options['cost']) ? $options['cost'] : 8;

		$salt = '';

		$letters_lowercase = range('a', 'z');
		$letters_uppercase = range('A', 'Z');
		$numbers = range(0, 9);

		$salt_chars = array_merge($letters_lowercase, $letters_uppercase, $numbers);

		for($i = 0; $i < 22; $i++) {
			$salt .= $salt_chars[array_rand($salt_chars)];
		}
		return crypt($pass, sprintf('$2y$%02d$', $rounds). $salt);
	}
}

if (!function_exists('password_verify')) {
	function password_verify($pass, $crypted_password) {
		return hash_equals($pass, crypt($pass, $crypted_password));
	}
}

$password = '123456';

// Crypt un mot de passe en utilisant l'algorithme Blowfish
$crypted_password = password_hash($password, PASSWORD_BCRYPT);

// Test si le mot de passe en clair est équivalent au mot de passe crypté
if (password_verify($password, $crypted_password)) {
	echo 'Le mot de passe est correct';
} else {
	echo 'Le mot de passe est incorrect';
}