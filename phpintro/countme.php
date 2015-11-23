<html>
	<head>
		<title>Visitor Count</title>
		<style>
			body{
				text-align:center;
				font-size:20pt;
				color:#FFF;
				background-color:#3d97ca;
			}
		</style>
	</head>
	<body>
	<p>Visitor count:
<?php
	$views = 0;
	$visitors_file = "visitors.txt";

	if(file_exists($visitors_file)){
		$views = (int)file_get_contents($visitors_file);
	}

	$views++;

	print $views;

	file_put_contents($visitors_file, $views)
?>
	</p>
	</body>
</html>