export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  php: "8.2.3",
  html: "5.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
  html: "<!doctype html>\n<html lang='en'>\n\t<head>\n\t<meta charset='UTF-8' />\n\t<link rel='icon' type='image/svg+xml' href='/vite.svg' />\n\t<meta name='viewport' content='width=device-width, initial-scale=1.0' />\n\t<title>Vite + React</title>\n</head>\n<body>\n\t<div id='root'>dsads</div>\n</body>\n<script>\n\tconsole.log('hello world');\n</script>\n</html>",
};
