module.exports = function () {

  async function home (req, res) {
    try {

      res.render('index');
    } catch(err){
      res.send(err.stack);
    }
  }
  async function loginPage (req, res) {
    try{

      res.render('login');
    } catch(err){
      res.send(err.stack);
    }
  }
  return {
    home,
    loginPage
  }
}