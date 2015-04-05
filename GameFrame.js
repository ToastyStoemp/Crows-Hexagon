//noprotect
//Main Hexagon Object make multiple instances of this objet in HexagonHandler
function Hexagon(xPos, yPos, Columnum, rowNum){
	this.TileID =  0;
	this.Position = {x: xPos, y: yPos};
	this.Column = Columnum;
	this.Row = rowNum;
	this.DrawGrid = true;
	this.IsSelected = false;
	
	this.Paint = function() {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		
		var img = document.getElementById("Tile_SpriteSheet");
    	ctx.drawImage(img,96 * this.TileID,0,96,72,this.Position.x,this.Position.y - 9,96,72);
		
		ctx.moveTo(this.Position.x + 31, this.Position.y + 0);
		ctx.lineTo(this.Position.x + 64, this.Position.y + 0);
		ctx.stroke();
		
		ctx.moveTo(this.Position.x + 64, this.Position.y + 0);
		ctx.lineTo(this.Position.x + 95, this.Position.y + 31);
		ctx.stroke();
		
		ctx.moveTo(this.Position.x + 95, this.Position.y + 31);
		ctx.lineTo(this.Position.x + 64, this.Position.y + 62);
		ctx.stroke();
		
		ctx.moveTo(this.Position.x + 64, this.Position.y + 62);
		ctx.lineTo(this.Position.x + 31, this.Position.y + 62);
		ctx.stroke();

		ctx.moveTo(this.Position.x + 31, this.Position.y + 62);
		ctx.lineTo(this.Position.x + 0, this.Position.y + 31);
		ctx.stroke();
		
		ctx.moveTo(this.Position.x + 0, this.Position.y + 31);
		ctx.lineTo(this.Position.x + 31, this.Position.y + 0);
		ctx.stroke();
		
		ctx.font = "30px Arial";
		ctx.fillText(this.TileID, this.Position.x + 38, this.Position.y + 42);
	};
	
	this.SetTileID = function(ID){ 
		this.TileID	= ID;
	};
	
	this.GetTileID = function(){
		return this.TileID;
	};
		
	this.ToggleSelected = function(){
		this.IsSelected = !this.IsSelected;
	};
		
	this.GetIsSelected = function(){
		return this.IsSelected;
	};
	
	this.ForceSelectionOff = function(){
		this.IsSelected = false;
	};
		
	this.GetPosition = function(){
		return this.Position;
	};
	
	this.GetColumn = function(){
		return this.Column;
	};
		
	this.GetRow = function(){
		return this.Row;
	};
}

//Main HexagonHandler, object used to controll all Hexagons
var HexagonHandler = {
	ColumnAmount: 1,
	RowAmount: 1,
	WorldMap: [], //Columns
		
	Init : function(){
		this.WorldMap[0] = [];
		this.WorldMap[0][0] = new Hexagon(0,0,0,0);
		this.Paint();
	},
	
	AddColumm : function(amount){
		amount = typeof amount !== 'undefined' ? amount : 1; //If no vallue given take 1
		
		for (i = 0; i < amount; i++){
			
			this.WorldMap[this.ColumnAmount] = [];
			
			if ((this.ColumnAmount + 1)%2 === 0)
			{
				for (j = 0; j < this.RowAmount; j++) { 
    				this.WorldMap[this.ColumnAmount][j] = new Hexagon(64 * this.ColumnAmount, (j * 62) + 31, this.ColumnAmount, j);
					this.WorldMap[this.ColumnAmount][j].SetTileID(Math.floor(Math.random() * 7) + 1);
				}
			}
			else
			{
				for (j = 0; j < this.RowAmount; j++) { 
    				this.WorldMap[this.ColumnAmount][j] = new Hexagon((128 * (this.ColumnAmount / 2)), (j * 62), this.ColumnAmount, j);
					this.WorldMap[this.ColumnAmount][j].SetTileID(Math.floor(Math.random() * 7) + 1);
				}
			}
			++this.ColumnAmount;
		}
	},
	
	AddRow : function(amount){
		amount = typeof amount !== 'undefined' ? amount : 1; //If no vallue given take 1
		
		for (i = 0; i < amount; i++){
			for (j = 0; j < this.ColumnAmount; j++){
				if ( j % 2 === 0)
				{
					this.WorldMap[j][this.RowAmount] = new Hexagon(((j / 2) * 128), (62 * this.RowAmount), j, this.RowAmount);
					this.WorldMap[j][this.RowAmount].SetTileID(Math.floor(Math.random() * 7) + 1);
				}
				else
				{
					this.WorldMap[j][this.RowAmount] = new Hexagon((j * 64), (62 * this.RowAmount) + 31, j, this.RowAmount);
					this.WorldMap[j][this.RowAmount].SetTileID(Math.floor(Math.random() * 7) + 1);
				}
			}
			++this.RowAmount;
		}
	},
	
	Paint : function(){
		for (i = 0; i < this.WorldMap.length; i++) { 
    		for (j = 0; j < this.WorldMap[i].length; j++) { 
    			this.WorldMap[i][j].Paint();
			}
		}
	}
};

HexagonHandler.Init(); //Initialize the Hexagon handler