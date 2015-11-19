<?php
	require_once 'partials/head.php';
?>

<section id="title">
	<h2>Supports de formation HTML/CSS/JS</h2>
	<h3>Choisir une catégorie</h3>
</section>

<main id="content" role="main">
	<ul>
		<?php
		$i = 1;
		foreach($categories as $category_title){ ?><!--
			--><li>
				<a href="#"><img src="img/skill<?= $i ?>.svg" alt="<?= $category_title ?>">
				<p><span><?= $category_title ?></span></p></a>
			</li><!--
			--><?php $i++; } ?>
	</ul>


</main>

<aside id="content_Ajax">

</aside>

<?php
	include_once 'partials/footer.php';