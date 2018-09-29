const shelters = require('../shelters.json');

module.exports = function (pool) {
  async function dashboard(req, res) {

    try {

      let stories = [];
      let username = req.params.username;
      let user = await createOrAddUser(username);
      if (user) {
        let userStoryResults = await pool.query('select * from stories where users_id = $1 order by id desc', [user.id]);
        stories = userStoryResults.rows;
        console.log(stories);
      }

      res.render('index', {
        stories,
        username
      });
    } catch (err) {
      res.send(err.stack);
    }
  }

  async function createOrAddUser(username) {

    let user = null;
    let userResults = await pool.query('select * from users where username = $1', [username])
    if (userResults.rows.length > 0) {
      user = userResults.rows[0];
    } else {
      // user should be added
      let userAddResults = await pool.query(`insert 
                          into users (username) values ($1)
                          returning id, username`, [username]);
      user = userAddResults.rows[0]
    }
    return user;
  }

  async function addStory(req, res) {
    try {

      let username = req.params.username;
      let user = await createOrAddUser(username);
      if (user) {
        let content = req.body.content;
        await pool.query(`insert into stories 
            (users_id, content, is_public) 
            values ($1, $2, false)`, [user.id, content]);
      }

      // flash message - new story added
      res.redirect(`/user/${user.username}/dashboard`);
    
    } catch (err) {
      res.send(err.stack);
    }
  }

  async function makeStoryPublic(req, res) {
    try {
      const storyId = req.params.id;
      const username = req.params.username;

      await pool.query('update stories set is_public = true where id = $1', [storyId]);
      
      // add flash message

      res.redirect(`/user/${username}/dashboard`);
    } catch (err) {
      res.send(err.stack);
    }
  }

  async function getStories(req, res) {
    try {
      let username = req.params.username;
      let storyResults = await pool.query('select * from stories where is_public = true order by id desc');
      let stories = storyResults.rows;
      
      res.render('stories', {
        stories,
        username
      });
    } catch (err) {
      res.send(err.stack);
    }
  }

  async function statistics(req, res) {
    try {
      let name = req.body.name;
      let number = req.body.number;
      let message = req.body.mess;

      //

      if (message === '') {
        req.flash('info', 'No message please enter some message.')
      } else {
        req.flash('success', 'Message sent');
      }

      res.redirect('contacts')
    } catch (err) {
      res.send(err.stack);
    }
  }
function findShelters(req,res){
    res.render("shelters", {shelters})
}
  return {
    dashboard,
    addStory,
    makeStoryPublic,
    getStories,
    statistics,
    findShelters
  }

}