//defining the global variables
let search = document.querySelector("#search"),
    refer = document.querySelector("#refer"),
    input = document.querySelector("#input"),
    e;


// button Event Listener
search.addEventListener("click", getWikiAPI);
input.addEventListener("keypress", enterPressed);

//Event on the enter key
function enterPressed(e){
    
    if(input === document.activeElement && input !== undefined || input !== "" || input !== null){
    
        console.log(e.keyCode);
        var key = e.keyCode;
        if (key === 13) {
            
            getWikiAPI();

        }

    }else{
        
        noResults()

    }
}


// Fetching the API

function getWikiAPI(){

    //Blurring the input field
    input.blur();

    //Capturing the search input
    newInput = document.querySelector("#input").value;

    //Filtering invalid searches
    if(newInput === undefined || newInput == "" || newInput == null){
        noResults()
    }else{

        //Presenting the results
        refer.removeAttribute("hidden");
        
        //getting the input in the URL        
        let url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(newInput)}&origin=*`;
        
        //requesting data Using Fetch
        fetch(url)
        //Turning the requested data into JSON
        .then((response)=>{
            return response.json();
        })
        //Taking the data and dispatching it into the program
        .then((data)=>{
            // creating the result elements
            let referSentence = data[2][0],
                resultTitle = data[1],
                resultDescription = data[2],
                resultLink = data[3];

                unpopulate();
                populate(data);
                       

            // Unpopulate the previous results in the UI
            function unpopulate(){
                for ( let i = 0; i < 10; i ++){
                  let link = document.querySelector(`#link${i}`);
                  link.setAttribute("hidden", "");
                }
            }

            //populating the results in the UI
            function populate(){
              for ( let i = 0; i < data[1].length; i++ ){

                  let title = document.querySelector(`#title${i}`),
                      description = document.querySelector(`#description${i}`),
                      link = document.querySelector(`#link${i}`),
                      results = document.querySelector(`#results${i}`);
            
                  title.textContent = "";
                  title.textContent = resultTitle[i];
                  description.textContent = "";
                  description.textContent = resultDescription[i];
                  link.removeAttribute("hidden");
                  link.setAttribute("href", `${resultLink[i]}`);
              }    
            }
            
            //Smooth Scroll function --Jquery--
            $('html, body').animate({
                scrollTop: $("#refer").offset().top
            }, 500);
        })
        //Catching possible errors
        .catch((error) =>{
            console.log("There was an error", error);
        })
    }
}

// No results functionality
function noResults(){
    alert("Oups! There seems to have a problem. Enter a valid input please.");
}