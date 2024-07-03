import React from 'react';
import '../appStyle/modal.css';

const galleryModal = ({ closeModal , showModal , updateGameCharactersAndBackground , allMedia, categories , openCategory}) => {
   
    const categoriesDiv = [];
    if(openCategory.categoryId !== 2){
        categoriesDiv.push(
            <div className='categories' >
                     { categories.map(category => (category.categoryId !== 2 && 
                       <button className ='categorybutton' onClick={() => showModal(category.categoryName)}>
                         <img className ='categoryImg' src={category.categoryImg} alt={category.categoryName}  />
                       </button>
                    ))}  
            </div>
        );
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => closeModal()}> X   </span>
                {categoriesDiv}      
                <div id="gallery" >
                        { allMedia.map(media => (
                            media.categoryId === openCategory.categoryId &&
                            <button className='buttonGalleryImg' onClick={() => updateGameCharactersAndBackground(media)}>
                                <img className ='galleryImg' src={media.url} alt={media.mediaName} />
                            </button>
                            
                        ))}    
                        
                </div>

            </div>    
        </div>
  );
};

export default  galleryModal ;