// server/index.js
const express = require("express");
const cors = require ('cors');
const PORT = process.env.PORT || 3001;
const app = express(); 
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const {getUsers} = require('../../model/getUsers');
const {getCodeShapes} = require('../../model/getCodeShapes');
const {getMenuInputsByPageId} = require('../../model/getMenuInputsByPageId');
const {getFormInputsByPageId} = require('../../model/getFormInputsByPageId');
const {getMediaByCategoryId} = require('../../model/getMediaByCategoryId');
const {getMediaById} = require('../../model/getMediaById');
const {getMediaByPageId} = require('../../model/getMediaByPageId');
const {getPageByName} = require('../../model/getPageByName');
const {getGalleryCategoreies} = require('../../model/getGalleryCategoreies');
const {getConditions} = require('../../model/getConditions');
const {getUserByEmail}= require ('../../model/getUserByEmail');
const {getElementsByGameId}= require ('../../model/getElementsByGameId');
const {insertUser}= require('../../model/insertUser');
const {insertGame}=require('../../model/insertGame');
const {insertElementInGame}=require('../../model/insertElementInGame');
const {deleteElementsByGameId}=require('../../model/deleteElementsByGameId');
const {getGameByNameAndUserId}=require('../../model/getGameByNameAndUserId');
const {getGamesByUserId}=require('../../model/getGamesByUserId');
const {getGameById}=require('../../model/getGameById');
const {getGameElementsPosByGameId}=require('../../model/getGameElementsPosByGameId');
app.use(cors());
app.use(express.json());

//app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  try { 
        
     let test = await getGameElementsPosByGameId(3);
         
      res.json(test);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
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
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
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
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
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
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }  
  });

  app.get("/creativPlay/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      // שליפת המשחקים של המשתמש
      let games = await getGamesByUserId(userId);
  
      // שליפת כל האלמנטים לכל משחק והמרת RowDataPacket לאובייקטים רגילים
      let allGamesElements = await Promise.all(
        games.map(async (game) => {
          let elements = await getGameElementsPosByGameId(game.gameId);
          return {
            gameId: game.gameId,
            elements: elements.map((row) => ({
              ...row,
              mediaPos: JSON.parse(row.mediaPos), // פענוח mediaPos ממחרוזת JSON
            })),
          };
        })
      );
  
      // הוספת mediaData לכל אלמנט
      let allElements = await Promise.all(
        allGamesElements.flatMap((gameElement) =>
          gameElement.elements.map(async (element) => {
            let mediaData;
            if (element.mediaId === -1) {
              // שימוש ב-extraContent אם mediaId הוא -1
              mediaData = JSON.parse(element.extraContent);
            } else {
              // שליפת mediaData לפי mediaId
              mediaData = await getMediaById(element.mediaId);
            }
            return {
              gameId: gameElement.gameId,
              mediaPos: element.mediaPos,
              mediaData: mediaData,
            };
          })
        )
      );
  
      // מיזוג האלמנטים לתוך המשחקים
      games = games.map((game) => {
        let elements = allElements.filter((elem) => elem.gameId === game.gameId);
        return {
          ...game,
          gameElements: elements, // עדכון האלמנטים למשחק המתאים
        };
      });
  
      // שליפת קטגוריות והמדיה שלהן
      let categories = await getGalleryCategoreies();
      let allMedia = [];
      for (let category of categories) {
        allMedia = allMedia.concat(await getMediaByCategoryId(category.categoryId));
      }
  
      // החזרת התוצאות כ-JSON
      res.json({ games, allMedia });
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  });
  app.get("/creator/:pageName", async (req, res) => {
    const pageName=req.params.pageName;
    try{
          let page = await getPageByName(pageName);
          let menubuttons = await getMenuInputsByPageId(page.pageId,'button');
          let categories = await getGalleryCategoreies();
          let allMedia = [];
          let codeShapes = await getCodeShapes();
          let conditions = await getConditions();
          for(let category of categories){
            allMedia = allMedia.concat(await getMediaByCategoryId(category.categoryId));
          }
          res.json({menubuttons,categories,allMedia,codeShapes,conditions});   
    }catch (error){
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }  
  }
  );


  app.post('/SignUp', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    // בדיקה אם כל השדות הנדרשים נשלחו
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }
        
        // הוסף את המשתמש החדש
        await insertUser(firstName, lastName, email, password);
        res.status(201).json({ success: true, message: 'User registered successfully.' });

    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


  app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
              success: false, message: 'Email and password are required.' });
        }
        
        try {
              const result = await getUserByEmail(email);
              const user = result[0];
              console.log(result , user);
              if (!result.length === 0) {   
                  return res.status(401).json({ 
                    success: false, message: 'Invalid email or password.' });
              }

              const match = await bcrypt.compare(password, user.password);
              if (!match) {
                  return res.status(401).json({ 
                    success: false, message: 'Invalid email or password.' });
              }
              res.json({
                  success: true,
                  message: 'Login successful.',
                  user: {
                      userId: user.userId,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                  },
                
              });
          
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({
              success: false, message: 'An error occurred. Please try again later.' });
        }
  });


  app.post('/saveGame', async (req, res) => {
    const { initialGameCharacters, gameName,userDetails} = req.body;
    
    if (!initialGameCharacters || !gameName || !userDetails) {
      return res.status(400).json({
        error: 'Missing initialGameCharacters, gameName, or userDetails' });
    }
    const userId = userDetails.userId;
    try {
        const existingGame = await getGameByNameAndUserId(gameName, userId);

        if (existingGame) {
            // Delete existing elements before updating
            await deleteElementsByGameId(existingGame.gameId); 
            // Insert new elements     
            await Promise.all(initialGameCharacters.map(async (character) => {
              const {mediaData, mediaPos, draggable, display ,shapes } = character;
              const mediaId = mediaData.mediaId;
              if (mediaId === -1) {
                await insertElementInGame(existingGame.gameId, mediaId, JSON.stringify(mediaPos) , draggable, display, JSON.stringify(shapes), JSON.stringify(mediaData));
              } else {
                await insertElementInGame(existingGame.gameId, mediaId, JSON.stringify(mediaPos), draggable, display, JSON.stringify(shapes),"");
              }
          }));
        } else {
            // Create a new game
            const newGame = await insertGame(userId,gameName);
          
            // Insert new elements
            await Promise.all(initialGameCharacters.map(async (character) => {
              const {mediaData, mediaPos, draggable, display ,shapes } = character;
              const mediaId = mediaData.mediaId;
              console.log(mediaId);
              if (mediaId === -1) {
                await insertElementInGame(newGame.gameId, mediaId, JSON.stringify(mediaPos), draggable, display, JSON.stringify(shapes), JSON.stringify(mediaData));
              } else {
                await insertElementInGame(newGame.gameId, mediaId, JSON.stringify(mediaPos), draggable, display, JSON.stringify(shapes),"");
              }
            }));
        }

        res.status(200).json({ 
              message: 'Game saved successfully' });
    } catch (error) {
      console.error('Error saving game:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.get('/getGame/:gameId', async (req, res) => {
    const { gameId } = req.params;
  
    try {
      // Fetch game details
      const gameDetails = await getGameById(gameId);
      if (!gameDetails) {
        return res.status(404).json({ error: 'Game not found' });
      }
  
      // Extract game name
      const gameName = gameDetails.gameName;
  
      // Fetch characters for the game
      const elements = await getElementsByGameId(gameId);
  
      // Reconstruct initialGameCharacters array
      const initialGameCharacters = await Promise.all(elements.map(async element => {
        let mediaData;
        if (element.mediaId === -1) {
          // Use extraContent if mediaId is -1 (Variable)
          mediaData = JSON.parse(element.extraContent);
        } else {
          // Fetch mediaData using mediaId
          const media = await getMediaById(element.mediaId);
          mediaData = media; 
        }
        // Check if mediaPos or shapes are null or undefined before parsing
        const mediaPos = element.mediaPos ? JSON.parse(element.mediaPos) : {};
        const shapes = element.codeShapes ? JSON.parse(element.codeShapes) : [];
  
        return {
          mediaData,
          mediaPos,
          draggable: element.draggable,
          display: element.display,
          shapes
        };
      }));
  
      // Send the response
      res.json({
        gameName,
        initialGameCharacters
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

