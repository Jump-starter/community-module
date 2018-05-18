
module.exports = (body, id) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Kickstarter Community Module</title>
    <link href="https://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet">
    <link href="https://d3mlfyygrfdi2i.cloudfront.net/favicon.png?v=2" rel="icon" type="image/png">
    <link rel="stylesheet" type="text/css" href="/assets/styles.css">
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  </head>
  <body>
    <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="Community">${body}</div>
    <script src="/assets/bundle.js"></script>
    <script>
      const project = window.location.href.split('Z')[1];
      ReactDOM.hydrate(
        React.createElement(Community, {projectId: ${id}}),
        document.getElementById('Community')
      );
    </script>
  </body>
  </html>
`;