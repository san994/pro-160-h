AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectedItemId:{default:"",type:"string"}
    },
    init:function(){
        this.handleClickEvent()
    },
    handleClickEvent:function(){
        this.el.addEventListener("click",(e)=>{
            const placesContainer = document.querySelector("#place");
            const {state} = placesContainer.getAttribute("tour");

            if(state==="places-list"){
                const id = this.el.getAttribute("id");
                const placeId=[
                    "garden",
                    "home",
                    "room"
                ]

                if(placeId.includes(id)){
                    placesContainer.setAttribute("tour", {
                        state: "view",
                        selectedCard: id
                      });
                    }
            }
            if(state==="view"){
                this.handleViewState()
            }
            if(state==="change-view"){
                this.handleViewState()
            }
                
            
        })
    },
    handleMouseLeaveEvents: function () {
        //Cursor 'mouseleave' Events
        this.el.addEventListener("mouseleave", () => {
          const { selectedItemId } = this.data;
          if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`);
            const id = el.getAttribute("id");
            if (id == selectedItemId) {
              el.setAttribute("material", {
                color: "#0077CC",
                opacity: 1,
              });
            }
          }
        });
      },
      handleViewState:function(){
       const el = this.el;
       const id = el.getAttribute("id");
       const placesContainer = document.querySelector("#places-container");
       const {selectedItemId} = placesContainer.getAttribute("cursor-listener");
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material",{
          src:`./assets/360_images/${selectedItemId}/${id}.jpg`,
          color:"#fff"
        })
      },
})