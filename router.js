const SignUpAuth = (req, res, next) => {
    console.log(req.body);
};

export default function(app) {
  app.post('/signup', SignUpAuth);
}
