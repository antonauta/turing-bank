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

                'name': 'Zeca Pagodinho',
                'preferredName':'Zeca',
                'balance':500,
                "cpf":'41245213830',
                'password':'111buba',
				'email':'zecapagodinho@gmail.com'
			},
			{
               '_id':'5d28d2223878dc2db8b24356',
                'name': 'Carlos Santana',
                'preferredName':'Santana',
                'balance':150,
                "cpf":"4123334444",
                'password':'123arroz',
				'email':'santana@gmail.com'
			},
		]
    },
    {
        model:'Operation',
        'documents':[
            {

                'value': 500,
                'type':0,
                destination:'5d28d2223878dc2db8b24355'
			},
			{
                'value': 150,
                'type':0,
                destination:'5d28d2223878dc2db8b24356'
			},
        ]
    }
];