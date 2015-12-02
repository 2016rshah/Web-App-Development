<html>
	<head>
		<title>Form Basics</title>

		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
		<style>
			body{
				text-align:center;
				/*background-color:#DCC6E0;*/
			}
			.column1{
				background-color:#C8F7C5;
			}
			.column2{
				background-color:#C5EFF7;
			}
		</style>
	</head>
	<body>
		<div class="container">
		<div class="row">
			<div class="six columns column1">
			<h3>Tell me about yourself</h3>
			<form action="index.php" method="post">
				<label for="name">Name</label>
			    <div id="name"><input autofocus="autofocus" type="text" name="namef" placeholder="First"><input type="text" name="namem" size="2" placeholder="M"><input type="text" name="namel" placeholder="Last"></div>
				<label for="phone">Phone Number</label><input id="phone" type="text" name="phone">
			    <label for="birthday">Birthday</label><input id="birthday" type="text" name="birthday">
				<label for="food">Favorite Food</label>
				<select id="food" name="food">
					<option value="Mexican">Mexican Cuisine</option>
					<option value="Thai">Thai Cuisine</option>
					<option value="Indian">Indian Cuisine</option>
					<option value="Italian">Italian Cuisine</option>
				</select>
				<br>
			    <button class="button-primary input" type="submit" accessKey="s"><u>S</u>ubmit</button>
			</form>
			</div>

			<?php if(strlen($_REQUEST["namef"]) > 1) : ?>
				<div class="six columns column2">
					<div class="results">
						<h3>Here's the last entry</h3>
						<p><b>Name:</b> <?php echo $_REQUEST["namef"], " ", $_REQUEST["namem"], " ", $_REQUEST["namel"]; ?></p>
						<p><b>Phone:</b> <?php echo $_REQUEST["phone"]; ?></p>
						<p><b>Birthdate:</b> <?php echo $_REQUEST["birthday"]; ?></p>
						<p><b>Favorite Food:</b> <?php echo $_POST["food"]; ?></p>
						<p><b>Time:</b> <?php echo date('Y-m-d H:i:s'); ?></p>
					</div>
				</div>
			<?php endif; ?>
		</div>

		</div>
	</body>
</html>