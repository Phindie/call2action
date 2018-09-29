module.exports = function () {

  async function home(req, res) {
    try {

      res.render('index');
    } catch (err) {
      res.send(err.stack);
    }
  }
  async function showContacts(req, res) {
    try {

      res.render('contact');
    } catch (err) {
      res.send(err.stack);
    }
  }
  // async function showEvents(req, res) {
  //   try {

  //     res.render('event');
  //   } catch (err) {
  //     res.send(err.stack);
  //   }
  // }
  async function showStaff(req, res) {
    try {

      res.render('login')
    } catch (err) {
      res.send(err.stack);
    }
  }
  async function contactForm(req, res) {
    try {
      let name = req.body.name;
      let number = req.body.number;
      let message = req.body.mess;

      if (message === '') {
        req.flash('info', 'No message please enter some message.')
      }
      else {
        req.flash('success', 'Message sent');
      }

      res.redirect('contacts')
    } catch (err) {
      res.send(err.stack);
    }
  }
  async function report (req, res) {
    try{

        res.redirect('/');
    } catch(err) {
      res.send(err.stack);
    }
  }
  async function signUp (req, res) {
    try{

      res.render('up');
    } catch(err) {
      res.send(err.stack);
    }
  }
  async function up(req, res) {
    try{

      res.redirect('login');
    } catch(err){
      res.send(err.stack);
    }
  }
  return {
    home,
    showContacts,
  
    showStaff,
    contactForm,
    report,
    signUp,
    up
  }
}