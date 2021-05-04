const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const url = 'localhost:3001';
//${url}/users/singin`

// Passport config
passport.serializeUser((user, done) => {
	console.log('incio serializacion');
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findOne({
		where: { id },
	})
		.then((user) => {
			console.log('Serialización finalizada exitosamente');
			if (user) {
				return done(null, user);
			} else {
				return done(new Error('Usuario no encontrado'));
			}
		})
		.catch((err) => {
			console.log(err);
			return done(new Error('Hubo un error interno en el proceso de serialización'));
		});
});

passport.use(
	new LocalStrategy(
		{ usernameField: 'email', passwordField: 'password' },
		(email, password, done) => {
			console.log('Email: ' + email);
			console.log('Password: ' + password);
			User.findOne({ where: { email: email } })
				.then((user) => {
					console.log('Entre al THEN');
					// Si el usuario existe
					if (user) {
						// Si las contrasenias matchean (comparePassword esta en el modelo 'user', devuelve true o false)
						if (password === user.password) {
							console.log(user.password + 'Entre al IF');
							// Se llama a la funcion done con 'user' (autenticacion exitosa)
							return done(null, {
								email: user.email,
								id: user.id,
								role: user.role,
                                name: user.name,
								phone:user.phone,
								log:true
							});
							// Si las contrasenias NO matchean
						} else {
							console.log('Password incorrect');
							// Se llama a la funcion done con 'null' (autenticacion fallida)
							return done(new Error('Password incorrect'));
						}
						// Si el usuario NO existe
					} else {
						console.log('Usuario no encontrado');
						// Se llama a la funcion done con 'null' (autenticacion fallida)
						return done(new Error('Usuario no encontrado'), null);
					}
				})
				.catch((err) => {
					console.error(err);
					return done(new Error('Error interno del servidor'), null);
				});
		}
	)
);
