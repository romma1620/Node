const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');

const app = express();

const users = [
    {
        name: 'Roman',
        email: 'romankuchera@gmail.com'
    },
    {
        name: 'Kate',
        email: 'ka@gmail.com'
    }
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

express.static(path.join(__dirname, 'views'));


app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


/*      SIGN IN*/
app.get('/', (req, res) => {

    res.render('main')
});


app.post('/', (req, res) => {
    let inputUser = req.body;

    const validUser = users.some((user) =>
            user.name === inputUser.name && user.email === inputUser.email

    );

            if (validUser){
                res.redirect('/users')
            }
            else {
                res.redirect('/register')
            }


});

/*     -------        */

/*      USERS       */
app.get('/users', (req, res) => {

    res.render('users', {users})
});
/*      --------        */

/*      SIGN UP        */
app.get('/register', (req, res) => {

    res.render('register')
});

app.post('/register', (req, res) => {
    console.log('work register');
    let inputUser = req.body;
    console.log(inputUser);

    const validUser = users.some((user) =>
        user.email === inputUser.email

    );
    console.log(validUser);

    if (validUser){
        res.render('register', {message: 'Your e-mail registered. Please log in'});
        console.log('err')
    }
    else {
        users.push(inputUser);
        console.log('-------------');
        console.log(inputUser);
        res.redirect('/')
    }


});





app.listen(1616, (err) => {
   if (err){
       console.log(err)
   }
   else {
       console.log('Listen 1616....')
   }

});

