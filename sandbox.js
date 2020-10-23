var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("admin", salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
});