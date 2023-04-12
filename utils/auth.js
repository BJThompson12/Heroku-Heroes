const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    console.log('withAuth reached');
    if (!req.session.loggedIn) {
      // Display a modal message and redirect the user to the login route
      res.send(`
        <html>
          <head>
            <title>Please Log In</title>
            <style>
              /* Style the modal */
              .modal {
                display: none;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.4);
              }
              
              /* Style the modal content */
              .modal-content {
                background-color: #fefefe;
                margin: auto;
                padding: 20px;
                border: 1px solid #888;
                width: 80%;
                max-width: 400px;
                text-align: center;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
              
              /* Style the close button */
              .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
              }
              
              .close:hover,
              .close:focus {
                color: black;
                text-decoration: none;
                cursor: pointer;
              }
              /* Add a gradient background */
              body {
                background: linear-gradient(to bottom right, #90cdf4, #a27cef, #f687b3);
              }
              /* Change the font style and size */
              body {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                font-size: 18px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="close">&times;</span>
                <p>Please log in to access this page</p>
              </div>
            </div>
            <script>
              // Get the modal
              var modal = document.getElementById("myModal");
              // Get the close button
              var span = document.getElementsByClassName("close")[0];
              // When the user clicks on the close button, hide the modal
              span.onclick = function() {
                modal.style.display = "none";
              }
              // When the user clicks anywhere outside of the modal, hide it
              window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
              }
              // Display the modal
              modal.style.display = "block";
              // Redirect the user to the login route after 3 seconds
              setTimeout(function() {
                window.location.href = "/";
              }, 3000);
            </script>
          </body>
        </html>
      `);
    } else {
      next();
    };
  };
  module.exports = withAuth;