//==========================================================================================================
//---- LAYER DEL MENU DE INICIO -----------------------------------------------------
//===========================================================================================================
var MenuLayer = cc.Layer.extend({
    sprite:null,
    zanahorias:[],
    conejos:[],
    size: null,
    contador:0,
    sprConejo:null,
    sprConejo2:null,
    sprConejo3:null,
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    irJugar: function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(JugarLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
    },
    irAyuda:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(AyudaLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
        cc.audioEngine.stopMusic();
    },
    irCreditos:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(CreditosLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
        cc.audioEngine.stopMusic();
    },
    creaZanahorias: function(){
		var zanahoria = new cc.Sprite(res.zanahoria_png);
        
        var n = this.random(0,5);       
        var posicionesX = [this.size.width/2, this.size.width/2 - 100, this.size.width/2 +100,this.size.width/2 - 150,this.size.width/2 + 150];
       
        zanahoria.setAnchorPoint(0.5,0);
        zanahoria.setPosition(posicionesX[n], cc.winSize.height);
        this.addChild(zanahoria, 3);
    
		var moveto = cc.moveTo(2,zanahoria.x, 0-zanahoria.height);
		zanahoria.runAction(moveto);
		this.zanahorias.push(zanahoria);		
		
	},
    creaZanahorias2: function(){
		var zanahoria = new cc.Sprite(res.zanahoria_png);
        
        var n = this.random(0,5);       
        var posicionesX = [this.size.width/2, this.size.width/2 - 100, this.size.width/2 +100,this.size.width/2 - 150,this.size.width/2 + 150];
       
        zanahoria.setAnchorPoint(0.5,0);
        zanahoria.setPosition(posicionesX[n], cc.winSize.height);
        
        zanahoria.setScale(0.5);
        this.addChild(zanahoria, 1);
        
		var moveto = cc.moveTo(2,zanahoria.x, 0-zanahoria.height);
		zanahoria.runAction(moveto);
		this.zanahorias.push(zanahoria);		
		
	},
    creaZanahorias3: function(){
		var zanahoria = new cc.Sprite(res.zanahoria_png);
        
        var n = this.random(0,5);       
        var posicionesX = [this.size.width/2, this.size.width/2 - 100, this.size.width/2 +100,this.size.width/2 - 150,this.size.width/2 + 150];
       
        zanahoria.setAnchorPoint(0.5,0);
        zanahoria.setPosition(posicionesX[n], cc.winSize.height);
            
        this.addChild(zanahoria, 5);
        zanahoria.setScale(2.0);

		var moveto = cc.moveTo(2,zanahoria.x, 0-(zanahoria.height*2));
		zanahoria.runAction(moveto);
		this.zanahorias.push(zanahoria);		
		
	},
    animarConejos: function(){
        
        var moveto1 = cc.moveTo(0.1, this.conejos[this.contador].x, this.conejos[this.contador].y +20);
        var moveto2 = cc.moveTo(0.1, this.conejos[this.contador].x, this.conejos[this.contador].y);
        var sequencia = cc.Sequence.create(moveto1, moveto2);
        this.conejos[this.contador].runAction(sequencia);
        this.contador++;
        if(this.contador>2)
            this.contador = 0;
    }
    ,
    update:function () {
        for(var i = 0; i < this.zanahorias.length;i++){
            if(this.zanahorias[i].y < 0-this.zanahorias[i].height){
                this.removeChild(this.zanahorias[i]);
                this.zanahorias.pop();
            }
        }
    },
    ctor:function () {
        
        this._super();

        size = cc.winSize;
        this.size = size;

        //---- Montando Fondo del menu de inicio y titulo del juego---------------
        var helloLabel = new cc.Sprite.create(res.titulo_png);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 240;
        this.addChild(helloLabel, 4);

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la "fondo falso"
        this.sprFondo2 = new cc.Sprite(res.fondo2_png);
        this.sprFondo2.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo2, 2);
        
        //Colocando conejos 
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setScale(1.5);
        this.sprConejo.setPosition(this.size.width / 2,this.size.height * 0.22);
     
        this.sprConejo2 = new cc.Sprite(res.conejo2_png);
        this.sprConejo2.setScale(1.5);
        this.sprConejo2.setPosition(this.size.width / 2 + 120,this.size.height * 0.22);
       
        
        this.sprConejo3 = new cc.Sprite(res.conejo3_png);
        this.sprConejo3.setScale(1.5);
        this.sprConejo3.setPosition(this.size.width / 2 - 120, this.size.height * 0.22);
        
        this.addChild(this.sprConejo2, 2); 
        this.addChild(this.sprConejo, 3); 
        this.addChild(this.sprConejo3, 2);
        
        this.conejos.push(this.sprConejo2);
        this.conejos.push(this.sprConejo);
        this.conejos.push(this.sprConejo3);      
        
        //---------CREACION DEL MENU---------------------------------------------
        
        var spr1 = new cc.Sprite.create(res.jugar1_png);
        var spr2 = new cc.Sprite.create(res.jugar2_png);
        
        var jugar = cc.MenuItemSprite.create(spr1, spr2, this.irJugar, this);
        
        spr1 = new cc.Sprite.create(res.ayuda1_png);
        spr2 = new cc.Sprite.create(res.ayuda2_png);
        
        var ayuda = cc.MenuItemSprite.create(spr1, spr2,this.irAyuda, this);
        
        spr1 = new cc.Sprite.create(res.creditos1_png);
        spr2 = new cc.Sprite.create(res.creditos2_png);
        
        var creditos = cc.MenuItemSprite.create(spr1, spr2,this.irCreditos, this);
        
        var menu = cc.Menu.create(jugar, ayuda, creditos);
        menu.alignItemsVerticallyWithPadding(10);
        menu.setPosition(size.width/2, size.height/2+50);
        this.addChild(menu,5);
        
        
        //--- Eventos animados
        this.schedule(this.creaZanahorias,0.7);
        this.schedule(this.creaZanahorias2, 1);
        this.schedule(this.creaZanahorias3, 2);
        this.schedule(this.update,0.1);
        this.schedule(this.animarConejos, 0.5);
                
        //--- MUSICA DE FONDO
        cc.audioEngine.setMusicVolume(0.7);
        cc.audioEngine.playMusic(res.temaFondo_mp3, true);

        return true;
    }
});

MenuLayer.create = function () {
    var sg = new MenuLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(layer);
    }
});

//==========================================================================================================
//---- LAYER DE JUGAR -----------------------------------------------------
//===========================================================================================================
var JugarLayer = cc.Layer.extend({
    sprite:null,
    conejo:null,
    zanahorias:[],
    estrellas:[],
    bombas:[],
    size: null,
    puntuaciones:null,
    score: 0,
    vidas: 5,
    intocable:false,
    hitb:false,
    hits:0,
    q:0,
    velocidad:2,
    efecto:null,
    star1:null,
    star2:null,
    star3:null,
    colores:[cc.color(255,0,0),cc.color(0,255,0),cc.color(0,0,255)],
    posicionesX:[480, 390, 570 ,300, 660],
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    volver: function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MenuLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
        cc.audioEngine.stopMusic();
    },
    creaZanahorias: function(){
		var zanahoria = new cc.Sprite(res.zanahoria_png);
        
        var n = this.random(0,5);       
       
        zanahoria.setAnchorPoint(0.5,0);
        zanahoria.setPosition(this.posicionesX[n], cc.winSize.height);
        this.addChild(zanahoria, 3);
    
		var moveto = cc.moveTo(this.velocidad, zanahoria.x, 0-zanahoria.height);
		zanahoria.runAction(moveto);
		this.zanahorias.push(zanahoria);		
		
	},
    creaEstrellas: function(){
		var estrella = new cc.Sprite(res.estrella_png);
        
        var n = this.random(0,5);       
        estrella.setAnchorPoint(0.5,0);
        estrella.setPosition(this.posicionesX[n], cc.winSize.height);
        this.addChild(estrella, 3);
    
		var moveto = cc.moveTo(this.velocidad,estrella.x, 0-estrella.height);
		estrella.runAction(moveto);
		this.estrellas.push(estrella);		
		
	},
    creaBombas: function(){
		var bomba = new cc.Sprite(res.bomba_png);
        
        var n = this.random(0,5);       
       
        bomba.setAnchorPoint(0.5,0);
        bomba.setPosition(this.posicionesX[n], cc.winSize.height);
        this.addChild(bomba, 3);
    
		var moveto = cc.moveTo(this.velocidad,bomba.x, 0-bomba.height);
		bomba.runAction(moveto);
		this.bombas.push(bomba);		
		
	}, 
    moverConejoA: function(location, event){
        
        var ubicacion = location.getLocation();
        var juego = event.getCurrentTarget();
        var mov = 90;
        var posX = juego.conejo.getPositionX();
        
        console.log(location.getLocation());
        
        if(ubicacion.x < posX){
                if((posX - mov) >= 300)
                    juego.conejo.setPositionX(posX - mov);
        } else if (ubicacion.x > posX){
                if((posX + mov) < 661)
                    juego.conejo.setPositionX(posX + mov);
        }
    
    },
    moverConejoB: function(key, event){
        var juego = event.getCurrentTarget();
        var mov = 90;
        var posX = juego.conejo.getPositionX();
        
        console.log("posicion"+posX);
        
        switch(key){
            case cc.KEY.left :
                if((posX - mov) >= 300)
                    juego.conejo.setPositionX(posX - mov);
                break;
                
            case cc.KEY.right :
                if((posX + mov) < 661)
                    juego.conejo.setPositionX(posX + mov);
                break;
        }
    
    },
    efecto1 : function(x, y){
        var efecto = new cc.ParticleSystem(res.czanahora_plist);
        efecto.setDuration(0.1);
        efecto.setScale(0.7);
        efecto.setTexture(cc.textureCache.addImage(res.zanahoria_png));
        efecto.setPosition(x, y);
        this.addChild(efecto,3);
    },
    efecto2 : function(x, y){
        var efecto = new cc.ParticleSystem(res.explosion_plist);
        efecto.setDuration(0.1);
        efecto.setScale(0.55);
        efecto.setTexture(cc.textureCache.addImage(res.explosion_png));
        efecto.setPosition(x, y);
        this.addChild(efecto,3);
    },
    efecto3 : function(x, y){
        var efecto = new cc.ParticleSystem(res.czanahora_plist);
        efecto.setDuration(0.1);
        efecto.setScale(0.7);
        efecto.setTexture(cc.textureCache.addImage(res.estrella_png));
        efecto.setPosition(x, y);
        this.addChild(efecto,3);
    },
    checkColissions : function (){
     
      var box = this.conejo.getBoundingBox();
    
      // Revisando colisiones de las zanahorias
      for(var i = 0 ; i < this.zanahorias.length; i++){
          var box2 = this.zanahorias[i].getBoundingBox();
         if(box.x < box2.x + box2.width && box.x + box.width > box2.x && 
            box.y < box2.y + box2.height && box.y + box.height > box2.y){
            console.log("Colision detectada");
            this.efecto1(this.zanahorias[i].getPositionX(), this.zanahorias[i].getPositionY());
            cc.audioEngine.playEffect(res.point_wav);
            this.score+=50;
            this.puntuaciones.setString(this.score);
            this.removeChild(this.zanahorias[i]);
            this.zanahorias.splice(i,1);
         }
      }
       
      // Revisando colisiones de las bombas
      for(var i = 0 ; i < this.bombas.length; i++){
          var box2 = this.bombas[i].getBoundingBox();
         if(box.x < box2.x + box2.width && box.x + box.width > box2.x && 
            box.y < box2.y + box2.height &&box.y + box.height > box2.y){
            console.log("BOOMM!!!");
            this.efecto2(this.bombas[i].getPositionX(), this.bombas[i].getPositionY());
            cc.audioEngine.playEffect(res.explosion_wav);
            if(this.intocable){
                this.hits++;
            }else{
                this.hitb = true;
                this.vidas--;
            }
            this.removeChild(this.bombas[i]);
            this.bombas.splice(i,1);
         }
          
      }
        
      //Colision con estrellas
     for(var i = 0 ; i < this.estrellas.length; i++){
          var box2 = this.estrellas[i].getBoundingBox();
         if(box.x < box2.x + box2.width && box.x + box.width > box2.x && 
            box.y < box2.y + box2.height &&box.y + box.height > box2.y){
            console.log("Colision detectada");
            this.efecto3(this.estrellas[i].getPositionX(), this.estrellas[i].getPositionY());
            cc.audioEngine.playEffect(res.point_wav);
            if(!this.intocable){
                cc.audioEngine.playMusic(res.temaPower_mp3,true);
                this.intocable = true;
                //this.velocidad--;
                cc.director.getScheduler().setTimeScale(1.5);
                this.efecto.setVisible(true);
                //this.efecto = new cc.ParticleSystem(res.power_plist);
                //this.efecto.setPosition(this.size.width/2, this.size.height);
                //this.addChild(this.efecto, 3);
                
                this.vida1.setVisible(false);
                this.vida2.setVisible(false);
                this.vida3.setVisible(false);
                this.vida4.setVisible(false);
                this.vida5.setVisible(false);
                
                this.star1.setVisible(true);
                this.star2.setVisible(true);
                this.star3.setVisible(true);
         
            }
            this.score+=150;
            this.puntuaciones.setString(this.score);
            this.removeChild(this.estrellas[i]);
            this.estrellas.splice(i,1);
         }
      }

	}, 
    checkPowerUp: function(){
        if(this.hits > 2 && this.intocable){
            this.intocable = false;
            this.hits = 0;
            cc.audioEngine.playMusic(res.temaJugar_mp3, true);
            this.conejo.setColor(cc.color(255,255,255));
            //this.velocidad++;
            cc.director.getScheduler().setTimeScale(1.0);
            //this.removeChild(this.efecto);
            this.efecto.setVisible(false);
            this.vida1.setVisible(true);
                if(this.vidas>1){
                    this.vida2.setVisible(true);
                    if(this.vidas>2){
                        this.vida3.setVisible(true);
                        if(this.vidas>3){
                            this.vida4.setVisible(true);
                            if(this.vidas>4){
                                this.vida5.setVisible(true);
                            }
                        }
                    }
                }
            
        }else if(this.intocable){
            if(this.q > 2){
                this.q = 0;
            }
            this.conejo.setColor(this.colores[this.q]);
            this.q++;
        }
    },
    actualizarVidas: function(){
        
        if(this.intocable){
            if(this.hits > 0){
                 this.star3.setVisible(false);
                if(this.hits > 1){
                     this.star2.setVisible(false);
                    if(this.hits > 2){
                         this.star1.setVisible(false);
                    }
                }
            }
        }
        else if(this.vidas < 5){
             this.vida5.setVisible(false);
            if(this.vidas < 4){
                this.vida4.setVisible(false);
                if(this.vidas < 3){
                    this.vida3.setVisible(false);
                   if(this.vidas < 2){
                           this.vida2.setVisible(false);
                     if(this.vidas < 1){
                            this.vida1.setVisible(false);
                         this.puntuaciones.setPosition(this.size.width/2 + 100,this.size.height*0.495);
                         /*
                            this.conejo.setVisible(false);

                            for(var i = 0; i < this.zanahorias.length; i++){
                                this.zanahorias[i].setVisible(false);
                            }
                            for(var i = 0; i < this.estrellas.length; i++){
                                this.estrellas[i].setVisible(false);
                            }
                            for(var i = 0; i < this.bombas.length; i++){
                                this.bombas[i].setVisible(false);
                            }
                            */
                            cc.director.pause();
                            this.addChild(new GameOverLayer(), 4);
                        }
                      }
                   }
                }
            }
        
    },
    efectob: function(){
        if(this.hitb){
            this.conejo.setColor(cc.color(0,0,0));
            this.hitb = false;
        }else{
            this.conejo.setColor(cc.color(255,255,255));
        }
    },
    ctor:function () {
        
        this._super();

        size = cc.winSize;
        this.size = size;
        
        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //Posicionando label de puntuacion
        this.puntuaciones = new cc.LabelTTF(this.score, "Arial", 28);
        this.puntuaciones.setColor(255,255,255);
        this.puntuaciones.setPosition(cc.winSize.width*0.67,  cc.winSize.height*0.92);
        this.addChild(this.puntuaciones, 5);
        
        //Colocando conejos
        this.conejo = new cc.Sprite(res.conejo_png);
        this.conejo.setScale(1.5);
        this.conejo.setPosition(size.width / 2,size.height * 0.22);
        this.addChild(this.conejo, 3); 
        
        //Colocando vidas en pantalla
        this.vida1 = new cc.Sprite(res.vida_png);
        this.vida2 = new cc.Sprite(res.vida_png);
        this.vida3 = new cc.Sprite(res.vida_png);
        this.vida4 = new cc.Sprite(res.vida_png);
        this.vida5 = new cc.Sprite(res.vida_png);
        
        this.vida1.setScale(0.5);
        this.vida2.setScale(0.5);
        this.vida3.setScale(0.5);
        this.vida4.setScale(0.5);
        this.vida5.setScale(0.5);

        this.vida1.setPosition(this.size.width*0.3, this.size.height*0.92);
        this.addChild(this.vida1, 5);

        this.vida2.setPosition((this.size.width*0.3)+50, this.size.height*0.92);
        this.addChild(this.vida2, 5);

        this.vida3.setPosition((this.size.width*0.3)+100, this.size.height*0.92);
        this.addChild(this.vida3, 5);
        
        this.vida4.setPosition((this.size.width*0.3)+150, this.size.height*0.92);
        this.addChild(this.vida4, 5);
        
        this.vida5.setPosition((this.size.width*0.3)+200, this.size.height*0.92);
        this.addChild(this.vida5, 5);
        
        this.star1 = new cc.Sprite(res.estrella_png);
        this.star2 = new cc.Sprite(res.estrella_png);
        this.star3 = new cc.Sprite(res.estrella_png);
        this.star1.setPosition(this.size.width*0.3, this.size.height*0.92);
        this.addChild(this.star1, 5);
        this.star2.setPosition((this.size.width*0.3)+50, this.size.height*0.92);
        this.addChild(this.star2, 5);
        this.star3.setPosition((this.size.width*0.3)+100, this.size.height*0.92);
        this.addChild(this.star3, 5);
        this.star1.setVisible(false);   
        this.star2.setVisible(false);
        this.star3.setVisible(false);
        
        this.efecto = new cc.ParticleSystem(res.power_plist);
        this.efecto.setDuration(-1);
        this.efecto.setScale(0.7);
        this.efecto.setTexture(cc.textureCache.addImage(res.estrella_png));
        this.efecto.setPosition(this.size.width/2, this.size.height);
        this.addChild(this.efecto, 3);
        this.efecto.setVisible(false);

        //--- Eventos animados
        this.schedule(this.creaZanahorias,0.7);
        this.schedule(this.creaBombas, 1.5);
        this.schedule(this.checkColissions,0.1);
        this.schedule(this.actualizarVidas,0.1);
        this.schedule(this.creaEstrellas, 7);
        this.schedule(this.efectob, 0.2);
        this.schedule(this.checkPowerUp, 0.1);

                
        //--- MUSICA DE FONDO
        cc.audioEngine.setMusicVolume(1);
        cc.audioEngine.playMusic(res.temaJugar_mp3, true);
        
        
       cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.moverConejoA,
		}, this);
                
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyReleased: this.moverConejoB,
        }, this);

        return true;
    }
});

JugarLayer.create = function () {
    var sg = new JugarLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

var JugarScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new JugarLayer();
        this.addChild(layer);
    }
});

//==========================================================================================================
//---- LAYER DE COMO JUGAR ? -----------------------------------------------------
//===========================================================================================================
var AyudaLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0,0);
            this.addChild(sp, 0, 1);
            
            //-- titulo del layer
            var label = new cc.LabelTTF("Como jugar?", "Arial", 28);
            label.setColor(255,255,255);
            label.setPosition(cc.winSize.width/2,  cc.winSize.height*0.90);
            this.addChild(label, 1);

            //-- Imagen de fondo
            var fondo = new cc.Sprite(res.fondo_png);
            fondo.setPosition(cc.winSize.width/2,  cc.winSize.height/2);
            this.addChild(fondo, 0);

            // Texto con instrucciones
            var about = cc.LabelTTF.create("Este es el juego del Conejo Feliz! Para ganar este juego tienes que coger las zanahorias con las cuales vas ganando puntos y evitar las bombas con las cuales pierdes vidas, ten cuidado! solo tienes 3 vidas. Buena Suerte! att: CValerio16", "Arial",22, cc.size(cc.winSize.width/2.5, cc.winSize.height*.75), cc.TEXT_ALIGNMENT_LEFT);
            about.setPosition(cc.winSize.width / 2,  cc.winSize.height/2 -20 );
            about.setAnchorPoint(0.5, 0.5 );
            this.addChild(about);
            
            
             //-- titulo del layer
            var label = new cc.LabelTTF("Constroles", "Arial", 28);
            label.setColor(255,255,255);
            label.setPosition(cc.winSize.width/2,  cc.winSize.height/2.2);
            this.addChild(label, 1);
            
            // Texto con instrucciones
            var about2 = cc.LabelTTF.create("Simplemente toque en la direccion que desea se mueva el conejo                       En caso de teclado:                            Izquierda: Flecha izquierda            Derecha: Flecha derecha", "Arial",20, cc.size(cc.winSize.width/2.5, cc.winSize.height*0.4), cc.TEXT_ALIGNMENT_LEFT);
            about2.setPosition(cc.winSize.width / 2,  cc.winSize.height/5);
            about2.setAnchorPoint(0.5, 0.5 );
            this.addChild(about2);


            var label = cc.LabelTTF.create("Volver", "Arial", 26);
            label.setColor(255,255,255);
            var back = cc.MenuItemLabel.create(label, this.onBackCallback);
            var menu = cc.Menu.create(back);
            menu.setPosition( cc.winSize.width / 2, 80);
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MenuLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
    }
});

AyudaLayer.create = function () {
    var sg = new AyudaLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

//==========================================================================================================
//---- LAYER DE CREDITOS -----------------------------------------------------
//===========================================================================================================
var CreditosLayer = cc.Layer.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {
            var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0,0);
            this.addChild(sp, 0, 1);
            
            //-- titulo del layer
            var label = new cc.LabelTTF("CREDITOS", "Arial", 28);
            label.setColor(255,255,255);
            label.setPosition(cc.winSize.width/2,  cc.winSize.height*0.90);
            this.addChild(label, 1);

            //-- Imagen de fondo
            var fondo = new cc.Sprite(res.fondo_png);
            fondo.setPosition(cc.winSize.width/2,  cc.winSize.height/2);
            this.addChild(fondo, 0);

            // Texto con instrucciones
            var about = cc.LabelTTF.create("Juego basado en la idea del Ing. Raydelto Hernandez.                                                                                                    Creado por CValerio16                                                                                                                                     'Wagon Wheel' Kevin MacLeod (incompetech.com)Licensed under Creative Commons: By  Attribution 3.0 http://creativecommons.org/licenses/by/3.0/  ", "Arial",22, cc.size(cc.winSize.width/2.5, cc.winSize.height*.75), cc.TEXT_ALIGNMENT_LEFT);
            about.setPosition(cc.winSize.width / 2,  cc.winSize.height/2 -20 );
            about.setAnchorPoint(0.5, 0.5 );
            this.addChild(about);


            var label = cc.LabelTTF.create("Volver", "Arial", 26);
            label.setColor(255,255,255);
            var back = cc.MenuItemLabel.create(label, this.onBackCallback);
            var menu = cc.Menu.create(back);
            menu.setPosition( cc.winSize.width / 2, 80);
            this.addChild(menu);
            bRet = true;
        }

        return bRet;
    },
    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MenuLayer.create());
        cc.director.runScene(cc.TransitionFadeTR.create(1, scene));
    }
});

CreditosLayer.create = function () {
    var sg = new CreditosLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

//==========================================================================================================
//---- LAYER DE GAMEOVER -----------------------------------------------------
//===========================================================================================================
var GameOverLayer = cc.LayerColor.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        cc.audioEngine.playEffect(res.gameover_ogg);
        cc.audioEngine.stopMusic();
        
        var fondo = new cc.Sprite(res.fondo3_png);
        fondo.setPosition(winSize.width/2, winSize.height/2);
        this.addChild(fondo, 1);
        
        var gameover = new cc.Sprite(res.gameover_png);
        gameover.setPosition(winSize.width/2, winSize.height*0.67);
        this.addChild(gameover, 2);
        
        var centerPos = cc.p(winSize.width / 2, winSize.height*0.335);
        cc.MenuItemFont.setFontSize(30);
        
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.reiniciar1_png),
        	new cc.Sprite(res.reiniciar2_png),
            function (pSender) {
                cc.director.resume();
                cc.director.runScene(new JugarScene());
            }, this);
        
        var menuItemExit = new cc.MenuItemSprite(
        	new cc.Sprite(res.salir1_png),
        	new cc.Sprite(res.salir2_png),
            function (pSender) {
                    cc.director.resume();
                    cc.director.runScene(new MenuScene());
            }, this);
        
        var menu = new cc.Menu.create(menuItemRestart, menuItemExit);
        menu.setPosition(centerPos);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu,3);
    }
});