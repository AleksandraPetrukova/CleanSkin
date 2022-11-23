const users = 
{
    SkinFairy: {
        
        handle: "SkinFairy",
        displayName: "Skin Fairy",
        email: "skinfairy@skinfairy.com",
    },
    SkincareFan: {
        
        handle: "SkincareFan",
        displayName: "Skincare Fan",
        email: "clearskin@clearskin.com",
    }
}

const reviews =
{
    "1": {
        
        handle: "SkinFairy",
        displayName: "Skin Fairy",
        productName: "Klairs Freshly Juiced Vitamin E Mask",
        type: "Moisturizers",
        
        review: "It provides a cooling feeling when I apply on my face. I do feel a bit sticky at first as it does not absorb right away. This cream is indeed beneficial as the next morning my skin is not greasy but fresh, shiny and hydrated. It makes a noticeable difference on my acne scars after one week of continuous using as well.",
        rating: 10,
        comments: [
            {displayName:"SkinFairy",
            comment: "Feels a little bit sticky on my skin. Didn't work out for me :("
        }
        ],
    },
    "2": {
        
        handle: "SkinFairy",
        displayName: "Skin Fairy",
        type: "Toners",
        productName: "SOME BY MI AHA BHA PHA 30 Days Miracle Toner",
        review: "I love using this toner at night after I take my makeup off since I feel like it always gets the remaining foundation my wipes don’t seem to get. I have very oily skin, and I appreciate that this toner isn’t slick feeling and doesn’t make me seem shinier. Because I use so many different products, it’s hard to pinpoint which product has what effectRead more about review stating Have bought this 3 times now! on my skin, but using this amongst the rest of my routine, my skin overall has improved in texture. I was going through a period of having breakouts, so I added the matching serum to this and my skin really did clear up. If you want a toner that will make your skin feel clean and smooth and primed for the rest of your routine, this is the one for you!",
        rating: 8,
        comments: [],
    },
    "3":{
        
        handle: "SkincareFan",
        displayName: "Skincare Fan",
        productName: "SOME BY MI AHA BHA PHA 14 Days Super Miracle Spot All Kill Cream",
        type: "Treatments",
        review: "Not right product for me. I was really hoped it would working and has been given time, followed instructions. But it keeps marking everething worsted. Skin extremely irritated, feels like burning, inflammation is everywhere, painful 24/7. Black heads and other blemish started coming out in place I never head before including in the ears inside, outside behind then, underneath the nouse, chin and jaw line, nake is extremely badly and painful, hair line. Its feels like it cleaning very nicely at beginning, but later instead diminish everething is increase ×100, had black heads now whal face and neck aria is full of blackheads and painful, very painful wight pimples. They red, they very painful and skin feeling burning non stop. I hoped it's just beginning and I just need give couple weeks but after 3+ weeks no improvement and just see its geting worst...somthing is not right. I am stopping to use it because my face looks horrifying. I did use any other products only this line. My sister started same time, have unfortunately same results. Maybe it's just not right for my skin. I would say try it, see for yourself, everyone is different. Product looks like are made good and ingredients is good many saying it absolutely wonder product. Again unfortunately for me it is not only not working, it made everything worse over the time of treatment.",
        rating: 5,
        comments: [],
    }
}

module.exports = { users, reviews };