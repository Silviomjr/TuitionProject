const url = window.location.pathname;

const menuItems = document.querySelectorAll('header .content a');

for(item of menuItems) {
    if (url.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
};

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            const firstAndLastPage = currentPage == 1 || currentPage == 2 || currentPage == totalPages - 1 || currentPage == totalPages;
            const pageAfterSelectedPage = currentPage <= selectedPage + 1;
            const pageBeforeSelectedPage = currentPage >= selectedPage - 1;
    
            if(firstAndLastPage || pageAfterSelectedPage && pageBeforeSelectedPage) {
                
                if (oldPage && currentPage - oldPage > 1) {
                    pages.push("...");
                };
                
    
                pages.push(currentPage);
                oldPage = currentPage
            };
        };
    
        return pages
};

function createPagination (pagination) {
    pagination = document.querySelector(".pagination");
    const filter = pagination.dataset.filter;
    const currentPage = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const pages = paginate(currentPage, total);
    

    let elements = "";

    for (let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    };
    
    pagination.innerHTML = elements;

    for (let page of pagination.childNodes) {
        if(page.href) {
            const queryParam = new URL(page.href);
            let params = new URLSearchParams(queryParam.search);
            let sourceId = params.get('page')
            
            if (sourceId == currentPage) {
                page.classList = 'selected';
            }
            
            

        }

    };

};

const pagination = document.querySelector(".pagination");

if (pagination) {
    createPagination(pagination);
}