// pdf path here
const docsPath = '/docs/1.pdf';

let pdfMaterial = null,
    pageCount = 1,
    pageDisplaying = false,
    pageFetching = null;

// size of pdf
const size = 1,
    canvas = document.querySelector('#pdfDisplay');
    context = canvas.getContext('2d');


    
// displaying the page
const displayPage = (num) => {

    // setting it true
    pageDisplaying = true;

    // getting the page here by getPage method
    pdfMaterial.getPage(num).then((page)=>{

        // setting the size
        const viewport = page.getViewport({scale:size});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // creating obj here
        const renderThings = {
            canvasContext : context,
            viewport
        }


        page.render(renderThings).promise.then(()=>{
                pageDisplaying = false

                if(pageFetching !== null){
                    displayPage(pageFetching);
                    pageFetching = null;
                }
        });

        // printing the current page here
        document.querySelector('#pageNum').textContent = num

    })

}



// getting the pdf here by using pdf.js library object here
pdfjsLib.getDocument(docsPath).promise.then((pdfThing) => {

    // setting the page pdf obj here
    pdfMaterial = pdfThing;

    // setting the total page num in the html
    document.querySelector('#pageCount').textContent = pdfMaterial.numPages;

    // setting the initail page number here
    displayPage(pageCount)
})