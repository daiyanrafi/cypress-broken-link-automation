describe('Broken link finder', () => {

    it('Verify across the page', () => {
        cy.visit('https://www.coursera.org/')
        let brokenLinks = 0
        let activeLinks = 0
        cy.get('a').each(($link, index) => {
            const href = $link.attr('href')
            if (href) {
                cy.request({ url: href, failOnStatusCode: false }).then((response) => {
                    if (response.status >= 400) {
                        cy.log(`Total  ${index + 1} link is Broken ${href} `)
                        brokenLinks++
                    }
                    else {
                        cy.log(`*** link  ${index + 1} is Active Link ***`)
                        activeLinks++
                    }
                })
            }
        }).then(($links) => {
            const totalLinks = $links.length
            cy.log(`Total links - ${totalLinks}`)
            cy.log(`Broken links - ${brokenLinks}`)
            cy.log(`Active links - ${activeLinks}`)
        })
    })
});