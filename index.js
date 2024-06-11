document.addEventListener("DOMContentLoaded", function () {

    const togglePaiementInputs = document.getElementsByName('paimentPlan');
    const formulasContainer = document.querySelectorAll('.formula');
    const formulas = document.querySelectorAll('.formulaSelect');
    const formulasPrice = document.querySelectorAll('.formulaPrice');
    const formulasPeriod = document.querySelectorAll('.formulaPeriod');
    const priceBlock = document.getElementsByClassName('priceBlock')[0];

    let paimentPlanType = "ann";
    let selectedFormula = 'tousRis';
    const pricesDict = {
        'tiersEss': 257,
        "tiersConf": 302,
        'tousRis': 357,
    };
    const formulaDict = {
        'tiersEss': "Tiers Essentiel",
        "tiersConf": "Tiers Confort",
        'tousRis': "Tous Risques",
    };

    function getPeriodType() { return paimentPlanType === 'ann' ? 'an' : 'mois' }

    function pricePerMonth(price = null) {
        if (price) {
            return Math.ceil(price / 12 + price / 12 * 0.10) + '€'
        } else {
            return Math.ceil(pricesDict[selectedFormula] / 12 + pricesDict[selectedFormula] / 12 * 0.10)
        }
    }

    function formulaPrice() {
        return paimentPlanType === 'ann' ? pricesDict[selectedFormula] : pricePerMonth();
    }

    function UpdateFormulas() {
        const annPriceDict = {
            0: '257€',
            1: '302€',
            2: '357€',
        };
        if (paimentPlanType === 'ann') {
            formulasPeriod.forEach((elem) => elem.innerText = 'par an');
            formulasPrice.forEach((elem, i) => elem.innerText = annPriceDict[i])
        } else {
            formulasPeriod.forEach((elem) => elem.innerText = 'par mois');
            formulasPrice.forEach((elem) => elem.innerText = pricePerMonth(elem.innerText.slice(0, elem.innerText.length - 1))); // slice is used to remove € symbol
        }
    }
    // summary price and offer
    function updatePriceBlock() {
        const priceBlockContent = `        
            <div class="info">
                <div>
                    <span class="formula">${formulaDict[selectedFormula]}</span>
                    <span class="price">${formulaPrice()}€<span class="small">/${getPeriodType()}</span></span>
                </div>
                <p>
                Lire le document d'information de l'offre
                <span class="formula">${formulaDict[selectedFormula]}</span>
                </p>
                </div>
                <div class="total">
                Total
                <div class="price">${formulaPrice()}€ <span class="small">/${getPeriodType()}</span></div>
            </div>`;
        priceBlock.innerHTML = priceBlockContent;
    }
    // For display border around selected formula
    function updateContainerStyle(plan) {
        Array.from(formulasContainer).forEach((elem) => {
            if (elem.classList.contains(plan)) {
                elem.classList.add('bordered')
            } else {
                elem.classList.remove('bordered')
            }
        });
    }

    //Periods
    togglePaiementInputs.forEach((elem) => {
        elem.addEventListener("change", function (event) {
            const planType = event.target.value;
            if (paimentPlanType !== planType) {
                paimentPlanType = planType;
                updatePriceBlock();
                UpdateFormulas();
            }
        });
    });
    // Formulas
    Array.from(formulas).forEach((elem) => {
        elem.addEventListener("change", function (event) {
            const formula = event.target.value;
            updateContainerStyle(formula);
            if (selectedFormula !== formula) {
                selectedFormula = formula;
                updatePriceBlock();
                updateContainerStyle(selectedFormula);
            }
        })
    });

    // For initial rendering
    updatePriceBlock();
    UpdateFormulas();
    updateContainerStyle(selectedFormula);
}, false);



