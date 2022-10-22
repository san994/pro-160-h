AFRAME.registerComponent("tour",{
    schema:{
      state:{default:"places-list",type:"string"},
      selectedCard:{default:"home",type:"#card1"}
    },
    init:function(){
        this.placesContainer = this.el;
        this.cameraEl=document.querySelector("#camera");
        this.createPlaces()
    },
    tick:function(){
     const {state} = this.el.getAttribute("tour");
     if(state==="view"){
       this.hideEl([this.placesContainer]);
       this.showView()
     }
    },
    createPlaces:function(){
        const details={
            garden:{
                position:{x:20,y:-4.5,z:-5.5},
                rotation:{x:0,y:-90,z:0},
                src:"./assets/thumbnail/garden.jpg",
                title:"Garden",
                id:"garden"
            },
            home:{
                position:{x:-9,y:35,z:-100},
                rotation:{x:0,y:0,z:0},
                src:"./assets/thumbnail/home.jpg",
                title:"Home",
                id:"home"
            },
            room:{
                position:{x:4.6,y:-5.5,z:25},
                rotation:{x:180,y:0,z:0},
                src:"./assets/thumbnail/room.jpg",
                title:"Room",
                id:"Room"
            }
        }

        for(var key in details){
            var item = details[key];

            const thumbnail = this.createThumbnail(item);
            const title = this.createTitleEl(item);
            thumbnail.appendChild(title);
            this.placesContainer.appendChild(thumbnail);
        }
    },
    createThumbnail:function(item){
        const entityEl = document.createElement("a-entity");
        const id = `places-${item.id}`;

        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("id",id);
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:3
        })
        entityEl.setAttribute("position",item.position);
        entityEl.setAttribute("rotation",item.rotation);
        entityEl.setAttribute("materail",{src:item.src,opacity:0.6});
        entityEl.setAttribute("cursor-listener",{});
        return entityEl
    },
    createTitleEl:function(item){
        const entityEl = document.createElement("a-entity");
        const id= `title-${item.id}`;

        entityEl.setAttribute("id",id);
        entityEl.setAttribute("text",{
            font: "exo2bold",
            align: "center",
            width: 70,
            color: "#e65100",
            value: item.title,
        });
        const elPosition={x:0,y:-4,z:0}
        entityEl.setAttribute("position",elPosition);
        entityEl.setAttribute("visible",true);
        return entityEl;
    },
    hideEl:function(elList){
        elList.map((e)=>{
            e.setAttribute("visible",false)
        })
    },
    showView:function(){
        const {selectedCard} = this.data;
        const skyEl = document.querySelector("#sky");

        skyEl.setAttribute("material",{
            src:`./assets/${selectedCard}.jpg`,
            color:"#fff"
        })
    },
})