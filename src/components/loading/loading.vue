<template>
    <div class="loading-wrapper">
        <div class="aircle"></div>
    </div>
</template>
<style lang="less" scoped>
    .loading-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0; top: 0;
        background: rgba(0, 0, 0, .5);
        .aircle {
            width: 300px;
            height: 300px;
            position: absolute;
            left:0;top:0;right:0;bottom:0;
            margin: auto;
            border-radius: 50%;
            background: linear-gradient(#000 50%, #fff 0%);
            display: flex;
            align-items: center;
            animation: rotate 2s linear infinite;
        }

        .aircle:after,
        .aircle:before {
            content: "";
            flex: 1;
            height: calc(100% / 6);
            border-radius: 50%;
            border: 50px solid #000;
            transform-origin: 0 50%;
            transform: scale(0.5);
            animation: change 1s ease-in-out infinite alternate;
        }

        .aircle:after {
            background: #000;
            border-color: #fff;
            transform-origin: 100% 50%;
            animation-delay: -1s;
        }
        .aircle:before {
            background: #fff;
        }

        @keyframes change {
            100% {
                transform: scale(1.5);
            }
        }

        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>

