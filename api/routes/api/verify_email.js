Token.findOne({ token: req.params.token }, function (err, token) {
    // token is not found into database i.e. token may have expired 
    if (!token){
        return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
    }
    // if token is found then check valid user 
    else{
        User.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
            // not valid user
            if (!user){
                return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
            } 
            // user is already verified
            else if (user.isVerified){
                return res.status(200).send('User has been already verified. Please Login');
            }
            // verify user
            else{
                // change isVerified to true
                user.isVerified = true;
                user.save(function (err) {
                    // error occur
                    if(err){
                        return res.status(500).send({msg: err.message});
                    }
                    // account successfully verified
                    else{
                      return res.status(200).send('Your account has been successfully verified');
                    }
                });
            }
        });
    }
    
});


app.get('/verify', function(req, res) {
    token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, config.jwt_secret_mail, (e, decoded) => {
                if (e) {
                    console.log(e)
                    return res.sendStatus(403)
                } else {
                    id = decoded.id;

                
//Update your database here with whatever the verification flag you are using 



                }

            });
        } catch (err) {

            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)

    }

})