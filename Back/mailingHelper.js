const nodemailer = require("nodemailer");


module.exports.mailing = async (req, res) => {

    try {
  
        let testAccount = await nodemailer.createTestAccount();
  
        let transporter = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "36c17be3ae6694",
            pass: "8e47f2b218f856"
            },
        });
  
  
        let info = await transporter.sendMail({
            from: '"Rémy"<teissier.remy@gmail.com>',
            to: req.body.email,
            subject: 'Formulaire Contact',
            text: req.body.name,
            html: `<b>Welcome<b><span>Nom: ${req.body.name}, Message: ${req.body.message}</span>`
        });
  
        return info
  
    } catch (e) {
        console.error(e);
        res.status(404).send('Fail to send your e-mail')
    }}