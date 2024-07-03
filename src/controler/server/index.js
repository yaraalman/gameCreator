// server/index.js
const express = require("express");
const cors = require ('cors');
const PORT = process.env.PORT || 3001;
const app = express(); 

const bodyParser = require('body-parser');

const {getUsers} = require('../../model/getUsers');
const {getCodeShapes} = require('../../model/getCodeShapes');
const {getMenuInputsByPageId} = require('../../model/getMenuInputsByPageId');
const {getFormInputsByPageId} = require('../../model/getFormInputsByPageId');
const {getMediaByCategoryId} = require('../../model/getMediaByCategoryId');
const {getMediaByGameId} = require('../../model/getMediaByGameId');
const {getMediaByPageId} = require('../../model/getMediaByPageId');
const {getPageByName} = require('../../model/getPageByName');
const {getGalleryCategoreies} = require('../../model/getGalleryCategoreies');


app.use(cors());
app.use(express.json());

//app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  try { 
        
        let test = await getCodeShapes();
         
      res.json(test);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/menus/:pageName", async (req, res) => {
  const pageName=req.params.pageName;
  try{
        let page = await getPageByName(pageName);
        let menubuttons = await getMenuInputsByPageId(page.pageId,'link');
        const Imgs = await getMediaByPageId(page.pageId);
        res.json({menubuttons, Imgs});   
  }catch (error){
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }  
}
);

app.get("/text/:pageName", async(req, res) => {
  const pageName = req.params.pageName;
  try { 
    let page = await getPageByName(pageName);
    let Imgs = await getMediaByPageId(page.pageId);
    res.json({page ,Imgs});
  }catch (error){
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }  
            
  });


  app.get("/form/:pageName", async (req, res) => {
    const pageName=req.params.pageName;
    try { 
      let page = await getPageByName(pageName);
      let Imgs = await getMediaByPageId(page.pageId);
      let formInputs = await  getFormInputsByPageId(page.pageId,'input');
      let linkButtons = await getFormInputsByPageId(page.pageId, 'link');
      let submitButtons = await getFormInputsByPageId(page.pageId, 'submit'); 
      let formButtons = linkButtons.concat(submitButtons);
  
      res.json({page, Imgs , formInputs, formButtons} );
    }catch (error){
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }  
  });

  app.get("/creator/:pageName", async (req, res) => {
    const pageName=req.params.pageName;
    try{
          let page = await getPageByName(pageName);
          let menubuttons = await getMenuInputsByPageId(page.pageId,'modalButton');
          let categories = await getGalleryCategoreies();
          let allMedia = [];
          let codeShapes = await getCodeShapes();
          for(category of categories){
            allMedia = allMedia.concat(await getMediaByCategoryId(category.categoryId));
          }
          res.json({menubuttons,categories,allMedia,codeShapes});   
    }catch (error){
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }  
         
    
  }
  );

  
  

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});