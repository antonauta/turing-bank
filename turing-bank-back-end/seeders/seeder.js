var seeder = require('mongoose-seed');

const mongoURI = `mongodb://${process.env.MONGOHOST || 'localhost'}/turingbank`
// Connect to MongoDB via Mongoose
seeder.connect(mongoURI, function() {

  // Load Mongoose models
  seeder.loadModels([
    'seeders/operation.js',
    'seeders/user.js'
  ]);

  // Clear specified collections
  seeder.clearModels(['User', 'Operation'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
	{
		'model': 'User',
		'documents': [
			{
                
                '_id':'5d28d2223878dc2db8b24355',

                'name': 'Antonio flavio',
                'preferredName':'Lord of the rings',
                'balance':400,
                'agency':'01',
                'account':'000023',
                "cpf":'41245213830',
                'password':'123456',
				'email':'antonio@gmail.com'
			},
			{
               '_id':'5d28d2223878dc2db8b24356',
                'name': 'Caio Santos',
                'preferredName':'Darth Vader',
                'balance':250,
                'agency':'01',
                 'account':'000022',
                "cpf":"98056620044",
                'password':'123456',
				'email':'santana@gmail.com'
			},
		]
    },
    {
        model:'Operation',
        'documents':[
     
      {
        'value':100,
        'description':'transferencia',
        destination:'5d28d2223878dc2db8b24356',
        origin_balance:400,
        destination_balance:250,
        origin:'5d28d2223878dc2db8b24355'
      }
        ]
    }
];