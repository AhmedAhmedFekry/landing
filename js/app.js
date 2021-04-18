class Section {
    lastSectionId=0;
    get seactionHtmlConten(){
        return `
        <section id="section${this.lastSectionId}" data-nav="section ${this.lastSectionId}" class="your-active-class">
        <div class="landing__container">
        <h2>Section ${this.lastSectionId}</h2>
        <p>tttttttttttttttttttttttttttttttttttttttttttttttt</p>
        </div>
        </section>
        `
    };
    addNewSection(){
        this.lastSectionId +=1;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend',this.seactionHtmlConten);
    }
}// end class 

class Navbar {
    menuElement = document.getElementById('navbar__list');
    buildMenu(){
        this.menuElement.innerHTML='';
        document.querySelectorAll('section').forEach(element =>{
            this.menuElement.insertAdjacentHTML("beforeend",`<li> <a class="menu__link" href="#${element.id}" data-section-id="${element.id}" >${element.dataset.nav}</a></li>`);
            
        });
        this.goToSection();
    }
    goToSection(){
        this.menuElement.addEventListener('click',function(event){
            event.preventDefault();
            document.getElementById(event.target.dataset.sectionId).scrollIntoView({behavior:'smooth'});
            addActiveClass(event.target.dataset.sectionId)
        });
    }
}
const section = new Section();
const menu = new Navbar()
const goToTopElement = document.getElementById('scrollToTop');

function addNewSection(){
    section.addNewSection();
    menu.buildMenu();
}

function goToTop(){
    goToTopElement.addEventListener('click', ()=>{
        window.scrollTo({
            top:0
        })
    });
}
function isSectionOnScreen(element,buffer){
    buffer = typeof buffer ==='undefined' ? 0 : buffer;
    const bounding=element.getBoundingClientRect();
    if (bounding.top >= buffer && bounding.left && buffer.right <= 
        ((window.innerWidth || document.documentElement.clientWidth) -buffer) &&
        bounding.bottom <= ((window.innerHeight || document.documentElement.clientHeight) -buffer ) ){
            return true
        } else{
            return false
        }       
}

function addActiveClass(id){
    document.querySelector('.link__active')?.classList.remove('link__active');
    document.querySelector(`[href="#${id}"]`).classList.add('link__active')

    document.querySelector('.your-active-class')?.classList.remove('your-active-class');
    document.querySelector(`#${id}`).classList.add('your-active-class');
    setTimeout(()=>{
        window.location.hash = id
    },0);
}

window.addEventListener('scroll',()=>{
    let scrollPrecent= ((window.innerHeight + window.scrollY)/document.body.offsetHeight)*100;
    if (scrollPrecent > 40 ){
        goToTopElement.classList.remove('display__none');
    }
    else {
        goToTopElement.classList.add('display__none');
    }
    document.querySelectorAll('section').forEach(element =>{
        if(isSectionOnScreen(element,-300)){
            addActiveClass(element.id)
        }
    });
});


section.addNewSection();
section.addNewSection();
section.addNewSection();

menu.buildMenu()
goToTop();