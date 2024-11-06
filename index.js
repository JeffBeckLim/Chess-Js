const letter = ["a","b","c","d","e","f","g","h"];
const number = ["1","2","3","4","5","6","7","8"];
const css_active_border = "2px red solid";
const css_normal_border = "2px black solid";
const css_moves_border = "2px blue solid";
createBoard(letter, number);

// CREATE BOARD

function createBoard(letter, number){
    const board = document.createElement('table');
    for(i=0; i<8; i++){

        const row = document.createElement('tr');
        for(j=0; j<8; j++){
            const cell = document.createElement('td');
            cell.classList.add("square");
            cell.setAttribute('id', letter[j]+number[i]);
            
            // cell.textContent = letter[j]+number[i]

            cell.style.backgroundColor = (i + j) % 2 === 0 ? 'white' : '#ccc';
            row.appendChild(cell);
        }
        board.appendChild(row)
    }
    document.body.appendChild(board);

    setPawn();
    setRook();
    setHorse();
    setBishop();
    setQueen();
    setKing();
}

// populate with pawns
function setPawn(){  
    for(i=0; i<8; i++){    
        const pawn_blk = document.createElement('img');
        pawn_blk.src ='assets/pawn_blk.png';
        pawn_blk.alt = 'pawn_blk';
        pawn_blk.classList.add("pawn");
        
        const pawn_wht = document.createElement('img');
        pawn_wht.src ='assets/pawn_wht.png';
        pawn_wht.alt = 'pawn_wht';
        pawn_wht.classList.add("pawn");
        

        let cell = document.getElementById(letter[i]+"2");
        cell.appendChild(pawn_blk);    

        let cell1 = document.getElementById(letter[i]+"7");
        cell1.appendChild(pawn_wht);  
    }
}
// populate with pawns
function setRook() {  
    let white_rooks = [document.getElementById("a8"),document.getElementById("h8")]
    
    for(i=0; i<2; i++){
        const rook_wht = document.createElement('img');
        rook_wht.src = 'assets/rook_wht.png';
        rook_wht.alt = 'rook_wht';
        white_rooks[i].appendChild(rook_wht);
    }

    let black_rooks = [document.getElementById("a1"),document.getElementById("h1")]
    
    for(i=0; i<2; i++){
        const rook_blk = document.createElement('img');
        rook_blk.src = 'assets/rook_blk.png';
        rook_blk.alt = 'rook_blk';
        black_rooks[i].appendChild(rook_blk);
    }
}
function setBishop(){
    let white_bishop = [document.getElementById("c8"),document.getElementById("f8")]
    
    for(i=0; i<2; i++){
        const bishop_wht = document.createElement('img');
        bishop_wht.src = 'assets/bishop_wht.png';
        bishop_wht.classList.add("bishop");
        bishop_wht.alt = 'bishop_wht';
        white_bishop[i].appendChild(bishop_wht);
    }

    let black_bishop = [document.getElementById("c1"),document.getElementById("f1")]
    
    for(i=0; i<2; i++){
        const bishop_blk = document.createElement('img');
        bishop_blk.src = 'assets/bishop_blk.png';
        bishop_blk.classList.add("bishop");
        bishop_blk.alt = 'bishop_blk';
        black_bishop[i].appendChild(bishop_blk);
    }
}

function setHorse(){
    let white_horse = [document.getElementById("b8"),document.getElementById("g8")]
    
    for(i=0; i<2; i++){
        const horse_wht = document.createElement('img');
        horse_wht.src = 'assets/horse_wht.png';
        horse_wht.classList.add("horse");
        horse_wht.alt = 'horse_wht';
        white_horse[i].appendChild(horse_wht);
    }

    let black_horse = [document.getElementById("b1"),document.getElementById("g1")]
    
    for(i=0; i<2; i++){
        const horse_blk = document.createElement('img');
        horse_blk.src = 'assets/horse_blk.png';
        horse_blk.classList.add("horse");
        horse_blk.alt = 'horse_blk';
        black_horse[i].appendChild(horse_blk);
    }
}

function setQueen(){
    const queen_wht = document.createElement('img');
    queen_wht.src = 'assets/queen_wht.png';
    queen_wht.classList.add("queen");
    queen_wht.alt = 'queen_wht';
    document.getElementById("d8").appendChild(queen_wht)

    const queen_blk = document.createElement('img');
    queen_blk.src = 'assets/queen_blk.png';
    queen_blk.classList.add("queen");
    queen_blk.alt = 'queen_blk';
    document.getElementById("d1").appendChild(queen_blk)
}

function setKing(){  
     const king_wht = document.createElement('img');
    king_wht.src = 'assets/king_wht.png';
    king_wht.classList.add("king");
    king_wht.alt = 'king_wht';
    document.getElementById("e8").appendChild(king_wht)

    const king_blk = document.createElement('img');
    king_blk.src = 'assets/king_blk.png';
    king_blk.classList.add("king");
    king_blk.alt = 'king_blk';
    document.getElementById("e1").appendChild(king_blk)
}


const squares = document.querySelectorAll(".square");


let active_square = null;
let moves = null;
squares.forEach(square => {
    square.addEventListener('click', () => {

        // reset if same square selected
        if(active_square == square){
            square.style.border = css_normal_border;
            active_square = null;
            
            // also reset the moves
            if(moves != null){
                // should be a loop
                moves.style.border = css_normal_border;
                moves = null;
            }

        }
        // set active square if has a piece
        else if(square.querySelector("img") != null){

            // eat ???
            if(active_square != null){
                square.removeChild(square.querySelector('img'));
                square.appendChild(active_square.querySelector('img'));

                // reset
                active_square.style.border = css_normal_border;
                active_square = null;
            }
            else{
                // reset style of previous active square if exist
                if(active_square != null){
                    active_square.style.border = css_normal_border;
                }
                square.style.border = css_active_border;
                
                // check possible moves
                moves = checkMoves(square);
                
                // for(i=0; i<length(moves))
                // moves.style.border = css_moves_border;

                active_square = square;
            }
        }


        // Move??
        if(active_square != null && square.querySelector('img')==null){
            console.log("move");
            square.appendChild(active_square.querySelector('img'));
            active_square.style.border = css_normal_border;
            active_square = null;

        }


    });
});

function checkMoves(square){
    let piece = square.querySelector('img').alt;
    let position = Number(square.id[1]);
    let possible_moves=[];

    if(piece == 'pawn_wht'){
        position--;
        possible_moves = document.getElementById(square.id[0]+position);

        return possible_moves;
    }
    if(piece == 'pawn_blk'){
        position++;
        possible_moves = document.getElementById(square.id[0]+position);

        return possible_moves;
    }
    if(piece == 'rook_wht'){
        // forward
        for(i=position; i>1; i--){
            possible_moves.push(document.getElementById(square.id[0]+i))
        }
        console.log(possible_moves)
        return possible_moves;
    }
    
    return 0;
}