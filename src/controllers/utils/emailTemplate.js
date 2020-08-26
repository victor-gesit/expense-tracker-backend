export default {
    html: (name, token) => {
        const html =  `
        <html>
        <head>
        <style>
            .body {
            background: #c51162
            }
        </style>
        </head>
        <body>
        <p>
            Hello ${name},
        </br>
        Open this mail on your mobile phone with eTracker installed.
        </br>
        </br>
        <p>
            You've requested a password reset on your eTracker account. Click below to reset your password.
        </p>
    <a href="expensetracker://passwordreset/${token}">Reset Password</a>
    </br>
    </br>
    This link expires in 10 minutes.
    </br>
    </br>
    <p>If you did not request a password reset, please ignore this email.</p>
        </body>
    </html>
        `
        return html
    }
}