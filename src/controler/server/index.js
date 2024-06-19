// server/index.js
const express = require("express");
const cors = require ('cors');
const PORT = process.env.PORT || 3001;
const app = express(); 
const menus = require('./myJson/menus');
const buttons = require('./myJson/buttons');
const forms = require('./myJson/forms');
const inputs = require('./myJson/inputs');
const media = require('./myJson/media');
const pages = require('./myJson/pages');


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/menus/:pageName", (req, res) => {
  const pageName=req.params.pageName;
  let page =pages.find(page =>(page.pageName ===pageName));
  const menu = menus.find(myMenu => myMenu.menuId === page.menuId);
  let menubuttons =[];
  for (const button of buttons){
    if(menu.buttons.includes(button.buttonId)){
      menubuttons.push(button);
    }
  }
  switch (pageName) {
      case "homePage":
              const homeImg = media.find(myMedia => myMedia.mediaName === "homeBackground"); 
              res.json({menubuttons,homeImg} );
           break;

      case "header":
              let logoImg = media.find(myMedia =>(myMedia.mediaName ==="logo"));  
              let cloudImg = media.find(myMedia =>(myMedia.mediaName ==="cloud")); 
              let turtleImg = media.find(myMedia =>(myMedia.mediaName ==="turtle"));  
              let profilIcon = media.find(myMedia =>(myMedia.mediaName ==="profilIcon"));
              
              res.json({menubuttons,logoImg ,cloudImg ,turtleImg ,profilIcon});
            break;

      case  "creator":
              res.json({menubuttons});
            break;

    }

});

app.get("/text/:pageName", (req, res) => {
  const pageName=req.params.pageName;
  let page =pages.find(page =>(page.pageName ===pageName));
    switch (pageName) {

      case "footer":
              res.json({pages});
              break;
      case "aboutUsPage":
              
              let aboutUsImg = media.find(img =>(img.mediaName ==="aboutUsImg" ));
              res.json({page ,aboutUsImg });
              break; 
    }
  });


  app.get("/form/:pageName", (req, res) => {
    const pageName=req.params.pageName;
    let page = pages.find(page =>(page.pageName === pageName));
    let form = forms.find(item =>(item.formId === page.formId));
    let formImg = null; 
    let formInputs =[];
    let formButtons =[];

    switch (pageName) {
      case "loginPage":  
        formImg = media.find(img =>(img.mediaName ==="loginImg"));
        break;

      case "singUpPage":
        formImg = media.find(img =>(img.mediaName ==="signUpImg" ));
        break;

      case "contactUsPage":
        formImg = media.find(img =>(img.mediaName ==="contactUsImg" ));
        break;
        
    }
    if (page && form){
        for (const item of inputs){
          if(form.inputs.includes(item.inputId)){
            formInputs.push(item);
          }
        }
        for (const button of buttons){
          if(form.buttons.includes(button.buttonId)){
            formButtons.push(button);
          }
        }
  }
    res.json({page, formImg, formInputs, formButtons} );
   
  });

  
  

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});