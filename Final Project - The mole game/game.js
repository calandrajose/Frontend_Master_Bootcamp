const htmlMole = document.querySelectorAll(".mole");
let score = 0;
let timeCount = 0;
let runAgainAt = Date.now();
let isHungry = true;

/*@return end of sad interval*/
function getSadInterval() {
    return Date.now() + 1000;
}
/*return end of gone interval*/
function getGoneInterval() {
    return Date.now() + Math.floor(Math.random() * 18000) + 1000;
}

/*return end of hungry interval from 2 to 5 sec*/
function getHungryInterval() {
    return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}


/*array of mole objects*/
moles = [
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-0"),
    },
    {
        status: "leaving",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-1"),
    },
    {
        status: "hungry",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-2"),
    },
    {
        status: "hungry",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-3"),
    },
    {
        status: "leaving",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-4"),
    },
    {
        status: "hungry",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-5"),
    },
    {
        status: "leaving",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-6"),
    },
    {
        status: "sad",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-7"),
    },
    {
        status: "leaving",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-8"),
    },
    {
        status: "hungry",
        next: getSadInterval(),
        king: false,
        node: document.getElementById("hole-9"),
    },
];

/*1 of 10 times will return true*/
function getKingStatus() {
    return Math.random() > 0.9;
}

/**leaving mole animation */
function leavingMole(mole) {
    mole.next = getSadInterval();
    mole.status = "leaving";
    if (mole.king) {
        mole.node.children[0].src = "./images/moles/king-mole-leaving.png";
    } else {
        mole.node.children[0].src = "./images/moles/mole-leaving.png";
    }
}
/**hungry mole animation */
function hungryMole(mole) {
    mole.status = "hungry";
    mole.king = getKingStatus();
    mole.next = getHungryInterval();
    if (mole.king) {
        mole.node.children[0].src = "./images/moles/king-mole-hungry.png";
    }
    else {
        mole.node.children[0].src = "./images/moles/mole-hungry.png";
    }
    mole.node.children[0].classList.add("hungry");
    mole.node.children[0].classList.remove("gone");
}
/**gone mole animation */
function goneMole(mole) {
    mole.next = getGoneInterval();
    mole.status = "gone";
    mole.node.children[0].classList.add("gone");
}
/**sad mole animation */
function sadMole(mole) {
    mole.status = "sad";
    mole.next = getSadInterval();
    if (mole.king) {
        mole.node.children[0].src = "./images/moles/king-mole-sad.png";
    } else {
        mole.node.children[0].src = "./images/moles/mole-sad.png";
    }
    mole.node.children[0].classList.remove("hungry");
}

/**changing status cicle */
function getNextStatus(mole) {
    switch (mole.status) {
        case "sad":
        case "fed":
            leavingMole(mole);
            break;
        case "leaving":
            goneMole(mole);
            break;
        case "gone":
            hungryMole(mole);
            break;
        case "hungry":
            sadMole(mole);
            break;
    }
}

/**executes animation */
function nextFrame() {
    const now = Date.now();
    if (now >= runAgainAt) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
        }
        runAgainAt = Date.now() + 100;
    }
    requestAnimationFrame(nextFrame);
}

function win() {
    document.querySelector('.bg').classList.add('hide');
    document.querySelector('.win').classList.remove("hide");
}

function feed(event) {
    if (!event.target.classList.contains("hungry")) {
        return;
    }
    const currentMole = moles[parseInt(event.target.dataset.index)];
    currentMole.status = "fed";
    currentMole.next = getSadInterval();
    if (currentMole.king) {
        currentMole.node.children[0].src = "./images/moles/king-mole-fed.png";
        score += 20;
    } else {
        currentMole.node.children[0].src = "./images/moles/mole-fed.png";
        score += 10;
    }
    currentMole.node.children[0].classList.remove("hungry");

    document.querySelector('.worm-container').style.width = `${score}%`;

    if (score >= 100) {
        win();
    }
}

document.querySelector(".bg").addEventListener("click", feed);
requestAnimationFrame(nextFrame);
