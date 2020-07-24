export interface IHousePlanItem {
    houseNumber: string;
    svgPath: string;
    transform: string;
    freeFlats: number;
    rooms: IRoomsMinPrices[];
}

export interface IRoomsMinPrices {
    name: number;
    minPrice: number;
}

export const PLAN_SVG = [
    {
        houseNumber: '1',
        svgPath: `M17.533 401l219.913 3 3.507-30-5.51-41.5-18.535.5-.501-6h-18.535l-1.002 5.5h-32.06v-7h-20.038l-1.002 
            6-31.56 1v-7H91.172v5.5h-8.015L266 94.5l-7.514-85L241.454 4l-6.512 7.5V6l-18.034-6-14.027 17v7l-15.028 17.5 6.011 
            47-2.504 3L170.82 86l-13.024 13.5-5.01-2-9.017 10.5v8l-15.529 18.5 3.507 27-12.023 14.5-5.51-2-8.516 10.5v7.5l-8.015 
            9v13l-9.017-2-15.029 16.5-5.009-1.5-8.516 11v8.5C15.629 299.7 1.503 346.667 0 363.5L9.518 396h7.013l1.002 5z`,
        transform: 'translate(186,204)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '2',
        svgPath: `M493.5 633.476L529 645 648 482.658 646 436.059 588.5 419.524 588.5 413.011 575 408 570.5 413.011 559.5
            409.002 546 426.038 550.5 469.129 554 470.131 554 476.645 570.5 482.658 545 512.721 545 517.23 527.5 510.717 523
            516.228 520.5 515.226 515.5 519.736 515.5 525.748 512.5 530.258 509.5 530.258 503.5 538.275 497.5 543.285 498.5
            546.793 491.5 552.304 492.5 557.315 486 564.831z`,
        transform: 'translate(-80, -143)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '3',
        svgPath: `M608.507 628.465L644.102 645 723.314 525.246 728.828 529.255 728.828 534.265 766.429 545.79 770.44
            539.276 780.466 542.282 791.997 523.743 793 481.654 775.453 477.144 775.453 470.13 760.413 465.119 756.402
            470.13 734.343 464.117 733.34 417.017 715.794 411.505 711.783 416.015 691.729 409 682.204 423.03 682.204
            430.546 665.66 453.093 667.665 511.718 657.137 508.21 649.617 519.234 649.115 526.248 628.56 556.312 625.051
            554.809 616.528 566.834 616.528 573.849 606 589.382 606.501 621.45 608.507 622.452z`,
        transform: 'translate(-80,-143)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '4',
        svgPath: `M569.557 607.74L515 684.873 524.009 753.993 890.393 758 975.483 580.693 986.995 496.548 992
            483.024 966.974 475.511 960.467 487.532 961.468 490.537 957.964 497.549 941.447 493.542 934.94 503.56
            933.939 511.574 925.931 526.6 908.913 520.589 910.915 489.035 895.399 484.026 892.396 489.035 824.825
            469 809.809 492.541 808.808 520.589 791.79 548.137 788.787 547.135 781.78 557.653 781.279 565.166 768.265
            586.704 767.264 619.761 776.274 622.766 776.274 629.277 805.304 638.794 846.347 564.165 854.856 566.669
            854.856 575.685 910.915 593.716 899.403 615.754 888.391 612.248 884.888 618.258 882.886 617.256 875.878
            629.277 873.876 653.82 865.868 653.82 848.349 686.877 837.838 686.877 837.838 678.362 818.818 678.362
            818.818 682.87 800.8 682.87 800.8 678.362 781.279 678.362 781.279 695.893 769.267 695.893 775.773 685.374
            775.773 623.768 736.732 610.745 690.184 685.374 685.679 685.374 685.679 676.86 665.658 676.86 665.658
            683.371 631.622 683.371 631.622 676.86 610.6 676.86 606.596 621.764z`,
        transform: 'translate(-80,-143)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '5',
        svgPath: `M616.65 406.958L626.168 409.964 633.181 400.447 631.678 359.877 629.674 357.873 628.672
            352.865 620.657 347.856 620.657 339.842 617.652 337.839 696.298 239.168 699.804 239.168 699.804
            250.688 735.371 259.704 717.838 282.243 704.814 278.737 673.756 315.801 673.756 349.359 647.708
            382.917 648.709 420.983 680.769 431 680.769 423.487 692.291 407.96 696.298 409.964 803.998 259.704
            805 196.094 765.927 183.572 765.927 177.061 753.905 172.553 748.896 178.062 739.378 175.057 726.855
            190.083 714.331 185.075 709.823 191.085 703.812 189.081 703.812 159.029 696.799 156.525 696.799
            146.007 692.791 144.504 692.791 142 669.749 142 648.209 166.042 649.21 207.113 634.683 204.107
            626.669 212.622 622.16 211.62 615.648 218.633 615.648 226.146 605.128 237.666 606.13 264.211 596.613
            273.728 593.106 272.225 585.592 278.737 585.592 286.25 574.572 299.272 570.564 297.769 562.549
            306.284 562.549 312.795 536 345.352 538.004 387.925 612.642 409.964z`,
        transform: 'translate(-80,-142)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }, {
        houseNumber: '6',
        svgPath: `M827 468.467L833 459.953 834 418.884 827 408.868 822 407.365 821 399.352 807 394.343 804 399.853
            801 397.849 872 291.672 876 293.174 875.5 306.697 923.5 323.725 916 336.747 906 335.245 878.5 376.313 878.5
            408.868 854 445.429 852.5 476.481 890.5 488 985.5 315.712 992 252.606 950.5 241.087 950.5 234.075 937 229.568
            932.5 234.075 921 231.07 909.5 248.6 908 252.606 905 251.104 905 245.094 892 241.087 887.5 246.095 881 244.092
            882.5 213.541 878 213.541 878 201.02 871.5 199.017 871.5 194.008 854 189 828.5 223.057 827 271.137 823 269.134
            816.5 276.647 816.5 284.66 808 295.178 805.5 295.178 800 301.688 799 309.702 787.5 326.229 784.5 324.727 777.5
            333.742 777.5 340.754 768.5 354.276 765.5 354.276 758 363.291 758 369.802 734 404.861 734 446.931 812.5
            471.472 816 467.466z`,
        transform: 'translate(-80,-143)',
        freeFlats: 0,
        rooms: [
            {
                name: 0,
                minPrice: 0
            }, {
                name: 1,
                minPrice: 0
            }, {
                name: 2,
                minPrice: 0
            }, {
                name: 3,
                minPrice: 0
            }, {
                name: 4,
                minPrice: 0
            }
        ]
    }
];
