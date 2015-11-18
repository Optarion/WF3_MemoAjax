	<footer role="footer">
		<section id="content_download">
			<h3>Télécharger les PDF</h3>
			<ul>
				<?php foreach($categories as $document => $category_title){ ?>
					<li>
						<a href="img/media/<?= $document ?>"><span><?= $category_title ?></a>
					</li>
				<?php } ?>
			</ul>
		</section><section id="content_help">
			<h3>Consulter l'aide en ligne</h3>
			<ul>
				<?php foreach($helps as $page_url => $page_label){ ?>
					<li><a href="<?= $page_url ?>" target="_blank"><?= $page_label ?></a></li>
				<?php } ?>
			</ul>
		</section>

		<article>
			<p>&copy; <?= date('Y') ?> / DigitalWorkshop</p>
			<p>This website is a copy of the original « Hive of knowledge »'s website. It's made for training purpose only with Digitalworkshop authorization. I don’t own any rights on the original version.</p>

		</article>

	</footer>

	<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
	<script src="js/scripts.js"></script>

</body>
</html>