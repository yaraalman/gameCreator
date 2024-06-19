const pages=
      [ 
         {
            pageId:-1,
            pageName:"header",
            menuId:1,
            media:[11,12,13,28] 
            
         },
         {
            pageId:-2,
            pageName:"footer",
            content:["Since 2024 - Israel","All rights reserved (c)"]
         },
         {
            pageId:1,
            pageName:"homePage",
            media:[14], 
            menuId:2
            
         },
         {
            pageId:2,
            pageName:"aboutUsPage",
            title:"Welcome to our website !",
            content:["At 'wizGame' we believe in the power of children to create and cope through play.",
            "Through our gaming platform, we provide children with the opportunity to be the game developers of their future and create unique and fascinating games themselves.",
            "What do we do on the site?",
            "• Game Creation: Through our user-friendly creation tools, children can create their own games easily and enjoyably. They can choose from a wide variety of backgrounds, characters, features, and effects to create the game that suits them best.",
            "• Share and Play: After creating their games, children can share them with their friends and compete with each other. This is an excellent way to encourage children to develop their creativity and interact positively and creatively with their peers.",
            "•	Integrated Learning: In addition to being game developers, children also learn technological and creative skills while creating their games. They practice smart thinking, problem-solving, and creative ability.",
            "•	Support Community: Our support team is available for any questions or issues that may arise while using the site. We are committed to providing a positive and professional experience for all users.",
            "In summary, at 'wizGame' we believe in the creative and adaptive ability of children and offer them an accessible and enjoyable platform to create their own games. With support and inspiration, we help them develop and grow through play.",
            "If you have any questions, suggestions, or requests, please contact us, and we will be happy to assist you!",
            "Best regards, 'wizGame' Team"],
            headr:"V",
            media:[18],
         },
         {
            pageId:3,
            pageName:"loginPage",
            url:"/loginPage",
            title:"Login",
            content:"",
            headr:"V",
            media:[17],
            formId:1
         },
         {
            pageId:4,
            pageName:"singUpPage",
            url:"/singUpPage",
            title:"Sign Up",
            content:"",
            headr:"V",
            media:[16],
            formId:2
         },
         {
            pageId:5,
            pageName:"contactUsPage",
            url:"/contactUsPage",
            title:"contact us",
            content:"Feel free to get in touch with us to ask questions, make suggestions, or share any requests you may have!",
            headr:"V",
            media:[15],
            formId:3,
         },
         {
            pageId:6,
            pageName:"profilePage",
            url:"/profilePage",
            title:"",
            content:"",
            headr:"V",          
            media:[]
         },
         {
            pageId:7,
            pageName:"creator",
            url:"/creatorZone",
            title:"",
            content:"",
            headr:"V",
            menuId:3,
            media:[]
         }
      ]
module.exports = pages
