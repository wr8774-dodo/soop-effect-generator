"use strict";

/* =========================================================
   SOOP 효과 생성기 - app.js
========================================================= */


/* =========================================================
   기본 상태
========================================================= */

const state = {
    mode: "normal",
    ratio: "16/9",

    normal: {
        selected: 0,

        photos: [
            createPhotoState(),
            createPhotoState(),
            createPhotoState()
        ]
    },

    polaroid: {
        src: "",

        x: 0,
        y: 0,
        zoom: 1,

        innerX: 0,
        innerY: 0,
        innerZoom: 1,

        cardX: 0,
        cardY: 0
    }
};


function createPhotoState() {
    return {
        src: "",
        x: 0,
        y: 0,
        zoom: 1
    };
}

function createPhotoState() {
    return {
        src: "",
        x: 0,
        y: 0,
        zoom: 1
    };
}
/* =========================================================
   생성기 로그인
========================================================= */

const LOGIN_API =
    "https://soop-effect-api.wr7881.workers.dev/login";

const AUTH_TOKEN_KEY =
    "soop_auth_token";

const loginGate =
    document.getElementById("loginGate");

const loginPassword =
    document.getElementById("loginPassword");

const loginButton =
    document.getElementById("loginButton");

const loginError =
    document.getElementById("loginError");


async function loginToGenerator() {

    const password =
        loginPassword.value.trim();

    if (!password) {
        loginError.textContent =
            "비밀번호를 입력해주세요.";
        return;
    }

    loginButton.disabled = true;
    loginError.textContent = "";

    try {

        const response =
            await fetch(
                LOGIN_API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        password
                    })
                }
            );

        const result =
            await response.json();

        if (
            !response.ok ||
            !result.ok ||
            !result.token
        ) {
            throw new Error(
                result.error ||
                "비밀번호가 올바르지 않습니다."
            );
        }

        localStorage.setItem(
            AUTH_TOKEN_KEY,
            result.token
        );

        document.body.classList.add(
            "authenticated"
        );

        loginPassword.value = "";

    } catch (error) {

        loginError.textContent =
            error.message ||
            "로그인에 실패했습니다.";

    } finally {

        loginButton.disabled = false;
    }
}


loginButton.addEventListener(
    "click",
    loginToGenerator
);


loginPassword.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            loginToGenerator();
        }
    }
);
/* =========================================================
   요소 찾기
========================================================= */

const modeButtons =
    document.querySelectorAll(".mode-button");

const ratioButtons =
    document.querySelectorAll(".ratio-button");

const normalMode =
    document.getElementById("normalMode");

const polaroidMode =
    document.getElementById("polaroidMode");

const storyMode =
    document.getElementById("storyMode");


/* 일반 사진 */

const normalInputs = [
    document.getElementById("normalPhoto1"),
    document.getElementById("normalPhoto2"),
    document.getElementById("normalPhoto3")
];

const photoTabs =
    document.querySelectorAll(".photo-tab");

const normalCropArea =
    document.getElementById("normalCropArea");

const normalCropImage =
    document.getElementById("normalCropImage");

const normalZoom =
    document.getElementById("normalZoom");

const normalReset =
    document.getElementById("normalReset");

const normalPreview =
    document.getElementById("normalPreview");

const previewPhotos = [
    document.querySelector(".preview-photo1"),
    document.querySelector(".preview-photo2"),
    document.querySelector(".preview-photo3")
];

const previewShine =
    document.querySelector(".preview-shine");

const previewHearts =
    document.querySelector(".preview-hearts");

const previewTouches =
    document.querySelector(".preview-touches");

const touchEnabled =
    document.getElementById("touchEnabled");

const touchType =
    document.getElementById("touchType");

const touchCount =
    document.getElementById("touchCount");

const touchSize =
    document.getElementById("touchSize");

const touchSpread =
    document.getElementById("touchSpread");

const deployResolution =
    document.getElementById("deployResolution");

const customResolutionWrap =
    document.getElementById("customResolutionWrap");

const customResolution =
    document.getElementById("customResolution");


/* 일반 효과 */

const shineEnabled =
    document.getElementById("shineEnabled");

const shinePower =
    document.getElementById("shinePower");

const shineSpeed =
    document.getElementById("shineSpeed");

const boingEnabled =
    document.getElementById("boingEnabled");

const boingPower =
    document.getElementById("boingPower");

const heartEnabled =
    document.getElementById("heartEnabled");

const heartCount =
    document.getElementById("heartCount");

const heartSize =
    document.getElementById("heartSize");

const heartSpread =
    document.getElementById("heartSpread");


/* 폴라로이드 */

const polaroidPhoto =
    document.getElementById("polaroidPhoto");

const polaroidCropArea =
    document.getElementById("polaroidCropArea");

const polaroidCropImage =
    document.getElementById("polaroidCropImage");

const polaroidBackgroundZoom =
    document.getElementById("polaroidBackgroundZoom");

const polaroidBackgroundReset =
    document.getElementById("polaroidBackgroundReset");

const polaroidSize =
    document.getElementById("polaroidSize");

const polaroidRotation =
    document.getElementById("polaroidRotation");

const polaroidInnerZoom =
    document.getElementById("polaroidInnerZoom");

const captionEnabled =
    document.getElementById("captionEnabled");

const captionText =
    document.getElementById("captionText");

const captionSize =
    document.getElementById("captionSize");

const captionFont =
    document.getElementById("captionFont");

const cameraUiEnabled =
    document.getElementById("cameraUiEnabled");

const focusEnabled =
    document.getElementById("focusEnabled");

const flashEnabled =
    document.getElementById("flashEnabled");

const polaroidPreview =
    document.getElementById("polaroidPreview");

const polaroidPreviewBackground =
    document.getElementById("polaroidPreviewBackground");

const cameraUI =
    document.getElementById("cameraUI");

const focusBox =
    polaroidPreview.querySelector(".focus-box");

const cameraFlash =
    polaroidPreview.querySelector(".camera-flash");

const polaroidCard =
    document.getElementById("polaroidCard");

const polaroidInnerImage =
    document.getElementById("polaroidInnerImage");

const polaroidCaption =
    document.getElementById("polaroidCaption");

const replayPolaroid =
    document.getElementById("replayPolaroid");

const polaroidImageWindow =
    document.querySelector(".polaroid-image-window");


/* 배포 */

const exportButton =
    document.getElementById("exportButton");

const uploadStatus =
    document.getElementById("uploadStatus");

const uploadStatusTitle =
    document.getElementById("uploadStatusTitle");

const uploadStatusText =
    document.getElementById("uploadStatusText");

const exportResult =
    document.getElementById("exportResult");

const iframeCode =
    document.getElementById("iframeCode");

const copyIframe =
    document.getElementById("copyIframe");


/* =========================================================
   비율
========================================================= */

const ratioMap = {
    "16/9": [16, 9],
    "4/5": [4, 5],
    "2/3": [2, 3]
};


function getRatioCSS() {
    const [w, h] =
        ratioMap[state.ratio];

    return `${w} / ${h}`;
}


function applyRatio() {

    const ratio =
        getRatioCSS();

    normalCropArea.style.aspectRatio =
        ratio;

    normalPreview.style.aspectRatio =
        ratio;

    polaroidCropArea.style.aspectRatio =
        ratio;

    polaroidPreview.style.aspectRatio =
        ratio;

    requestAnimationFrame(() => {
        updateNormalCrop();
        updateNormalPreview();

        updatePolaroidCrop();
        updatePolaroidPreview();
    });
}


/* =========================================================
   모드 선택
========================================================= */

modeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            modeButtons.forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            state.mode =
                button.dataset.mode;

            normalMode.classList.toggle("hidden", state.mode !== "normal");
            polaroidMode.classList.toggle("hidden", state.mode !== "polaroid");
            storyMode.classList.toggle("hidden", state.mode !== "story");

            if (state.mode === "polaroid") {
                requestAnimationFrame(() => {
                    updatePolaroidCrop();
                    updatePolaroidPreview();
                });
            }

            if (state.mode === "story") {
                restartStoryTimer();
            }
        }
    );
});


/* =========================================================
   비율 선택
========================================================= */

ratioButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            ratioButtons.forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            state.ratio =
                button.dataset.ratio;

            applyRatio();
        }
    );
});


/* =========================================================
   이미지 파일 읽기
========================================================= */

function readImageFile(file, callback) {

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("이미지 파일을 선택해주세요.");
        return;
    }

    const reader =
        new FileReader();

    reader.onload = () => {
        callback(reader.result);
    };

    reader.readAsDataURL(file);
}


/* =========================================================
   이미지 COVER 계산
========================================================= */

function getCoverSize(
    img,
    container,
    zoom = 1
) {

    if (
        !img ||
        !img.naturalWidth ||
        !img.naturalHeight ||
        !container.clientWidth ||
        !container.clientHeight
    ) {
        return null;
    }

    const iw =
        img.naturalWidth;

    const ih =
        img.naturalHeight;

    const cw =
        container.clientWidth;

    const ch =
        container.clientHeight;

    const scale =
        Math.max(
            cw / iw,
            ch / ih
        ) * zoom;

    return {
        width: iw * scale,
        height: ih * scale
    };
}


/* =========================================================
   이동 범위 제한
========================================================= */

function clampPosition(
    x,
    y,
    imageWidth,
    imageHeight,
    container
) {

    const extraX =
        Math.max(
            0,
            (imageWidth - container.clientWidth) / 2
        );

    const extraY =
        Math.max(
            0,
            (imageHeight - container.clientHeight) / 2
        );

    return {
        x: Math.max(
            -extraX,
            Math.min(extraX, x)
        ),

        y: Math.max(
            -extraY,
            Math.min(extraY, y)
        )
    };
}


/* =========================================================
   일반 사진 불러오기
========================================================= */

normalInputs.forEach(
    (input, index) => {

        input.addEventListener(
            "change",
            () => {

                const file =
                    input.files[0];

                readImageFile(
                    file,
                    src => {

                        const photo =
                            state.normal.photos[index];

                        photo.src = src;
                        photo.x = 0;
                        photo.y = 0;
                        photo.zoom = 1;

                        previewPhotos[index].src =
                            src;

                        if (
                            state.normal.selected === index
                        ) {
                            loadSelectedNormalPhoto();
                        }

                        updateNormalPreview();
                    }
                );
            }
        );
    }
);


/* =========================================================
   일반 사진 탭
========================================================= */

photoTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            photoTabs.forEach(item =>
                item.classList.remove("active")
            );

            tab.classList.add("active");

            state.normal.selected =
                Number(tab.dataset.photo);

            loadSelectedNormalPhoto();
        }
    );
});


function loadSelectedNormalPhoto() {

    const photo =
        state.normal.photos[
            state.normal.selected
        ];

    normalZoom.value =
        photo.zoom;

    const message =
        normalCropArea.querySelector(
            ".empty-message"
        );

    if (!photo.src) {

        normalCropImage.removeAttribute("src");

        if (message) {
            message.style.display = "grid";
        }

        return;
    }

    if (message) {
        message.style.display = "none";
    }

    normalCropImage.onload = () => {
        updateNormalCrop();
    };

    normalCropImage.src =
        photo.src;
}


/* =========================================================
   일반 사진 편집
========================================================= */

function updateNormalCrop() {

    const photo =
        state.normal.photos[
            state.normal.selected
        ];

    if (
        !photo.src ||
        !normalCropImage.naturalWidth
    ) {
        return;
    }

    const size =
        getCoverSize(
            normalCropImage,
            normalCropArea,
            photo.zoom
        );

    if (!size) {
        return;
    }

    const position =
        clampPosition(
            photo.x,
            photo.y,
            size.width,
            size.height,
            normalCropArea
        );

    photo.x =
        position.x;

    photo.y =
        position.y;

    normalCropImage.style.width =
        `${size.width}px`;

    normalCropImage.style.height =
        `${size.height}px`;

    normalCropImage.style.transform =
        `translate(-50%, -50%)
         translate(
            ${photo.x}px,
            ${photo.y}px
         )`;
}


/* =========================================================
   일반 미리보기
========================================================= */

function updateNormalPreview() {

    state.normal.photos.forEach(
        (photo, index) => {

            const img =
                previewPhotos[index];

            if (!photo.src) {

                img.style.display =
                    "none";

                return;
            }

            img.style.display =
                "block";

            if (img.src !== photo.src) {
                img.src = photo.src;
            }

            const update = () => {

                const size =
                    getCoverSize(
                        img,
                        normalPreview,
                        photo.zoom
                    );

                if (!size) {
                    return;
                }

                const editWidth =
                    normalCropArea.clientWidth || 1;

                const editHeight =
                    normalCropArea.clientHeight || 1;

                const scaleX =
                    normalPreview.clientWidth /
                    editWidth;

                const scaleY =
                    normalPreview.clientHeight /
                    editHeight;

                img.style.width =
                    `${size.width}px`;

                img.style.height =
                    `${size.height}px`;

                img.style.transform =
                    `translate(-50%, -50%)
                     translate(
                        ${photo.x * scaleX}px,
                        ${photo.y * scaleY}px
                     )`;
            };

            if (img.complete) {
                update();
            } else {
                img.onload = update;
            }
        }
    );
}


/* =========================================================
   일반 확대/축소
========================================================= */

normalZoom.addEventListener(
    "input",
    () => {

        const photo =
            state.normal.photos[
                state.normal.selected
            ];

        photo.zoom =
            Number(normalZoom.value);

        updateNormalCrop();
        updateNormalPreview();
    }
);


normalReset.addEventListener(
    "click",
    () => {

        const photo =
            state.normal.photos[
                state.normal.selected
            ];

        photo.x = 0;
        photo.y = 0;
        photo.zoom = 1;

        normalZoom.value = 1;

        updateNormalCrop();
        updateNormalPreview();
    }
);


/* =========================================================
   일반 사진 드래그
========================================================= */

let normalDragging = false;

let normalStartX = 0;
let normalStartY = 0;

let normalOriginX = 0;
let normalOriginY = 0;


normalCropArea.addEventListener(
    "pointerdown",
    event => {

        const photo =
            state.normal.photos[
                state.normal.selected
            ];

        if (!photo.src) {
            return;
        }

        normalDragging = true;

        normalStartX =
            event.clientX;

        normalStartY =
            event.clientY;

        normalOriginX =
            photo.x;

        normalOriginY =
            photo.y;

        normalCropArea.setPointerCapture(
            event.pointerId
        );
    }
);


normalCropArea.addEventListener(
    "pointermove",
    event => {

        if (!normalDragging) {
            return;
        }

        const photo =
            state.normal.photos[
                state.normal.selected
            ];

        photo.x =
            normalOriginX +
            (
                event.clientX -
                normalStartX
            );

        photo.y =
            normalOriginY +
            (
                event.clientY -
                normalStartY
            );

        updateNormalCrop();
        updateNormalPreview();
    }
);


function stopNormalDrag() {
    normalDragging = false;
}


normalCropArea.addEventListener(
    "pointerup",
    stopNormalDrag
);

normalCropArea.addEventListener(
    "pointercancel",
    stopNormalDrag
);


/* =========================================================
   광택
========================================================= */

function playShine() {

    if (!shineEnabled.checked) {
        return;
    }

    previewShine.style.animation =
        "none";

    previewShine.style.opacity =
        String(
            Number(shinePower.value)
        );

    void previewShine.offsetWidth;

    previewShine.style.animation =
        `shineMove ${shineSpeed.value}s ease-out`;
}


normalPreview.addEventListener(
    "mouseenter",
    () => {

        if (
            !normalPreview.classList.contains(
                "clicked"
            )
        ) {
            playShine();
        }
    }
);


normalPreview.addEventListener(
    "mouseleave",
    () => {

        // 마우스가 미리보기 밖으로 나가면
        // 클릭 상태를 해제해서 무조건 ①로 복귀
        normalPreview.classList.remove(
            "clicked"
        );

        playShine();
    }
);

/* =========================================================
   보잉
========================================================= */

function playBoing() {

    if (!boingEnabled.checked) {
        return;
    }

    normalPreview.style.setProperty(
        "--boing",
        boingPower.value
    );

    normalPreview.style.animation =
        "none";

    void normalPreview.offsetWidth;

    normalPreview.style.animation =
        "previewBoing .58s ease-out";
}


/* =========================================================
   하트
========================================================= */

function createHearts() {

    if (!heartEnabled.checked) {
        return;
    }

    const count =
        Number(heartCount.value);

    const size =
        Number(heartSize.value);

    const spread =
        Number(heartSpread.value);

    const symbols = [
        "♥",
        "♡",
        "💗",
        "💕"
    ];

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const heart =
            document.createElement("span");

        heart.className =
            "heart";

        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            spread *
            (
                0.35 +
                Math.random() * 0.65
            );

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        const rotation =
            -90 +
            Math.random() * 180;

        const actualSize =
            size *
            (
                0.65 +
                Math.random() * 0.75
            );

        heart.style.fontSize =
            `${actualSize}px`;

        heart.style.color =
            Math.random() > 0.5
                ? "#ff6fae"
                : "#ff9ac5";

        heart.style.setProperty(
            "--heart-x",
            `${x}px`
        );

        heart.style.setProperty(
            "--heart-y",
            `${y}px`
        );

        heart.style.setProperty(
            "--heart-r",
            `${rotation}deg`
        );

        heart.style.setProperty(
            "--heart-duration",
            `${
                0.65 +
                Math.random() * 0.55
            }s`
        );

        previewHearts.appendChild(
            heart
        );

        heart.addEventListener(
            "animationend",
            () => heart.remove()
        );
    }
}


/* =========================================================
   마우스 오버 터치 효과
========================================================= */

function createTouchParticles() {

    if (
        !touchEnabled.checked ||
        !previewTouches
    ) {
        return;
    }

    const count =
        Number(touchCount.value);

    const size =
        Number(touchSize.value);

    const spread =
        Number(touchSpread.value);

    const type =
        touchType.value;

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            `touch-particle touch-${type}`;

        if (type === "star") {
            particle.textContent =
                Math.random() > .45 ? "✦" : "✧";
        }

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            spread *
            (
                .2 +
                Math.random() * .8
            );

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        const actualSize =
            size *
            (
                .55 +
                Math.random() * .8
            );

        const rotation =
            -90 +
            Math.random() * 180;

        particle.style.fontSize =
            `${actualSize}px`;

        if (type !== "star") {
            particle.style.width =
                `${Math.max(3, actualSize * (type === "light" ? .34 : .18))}px`;
            particle.style.height =
                particle.style.width;
        }

        particle.style.setProperty(
            "--touch-x",
            `${x}px`
        );

        particle.style.setProperty(
            "--touch-y",
            `${y}px`
        );

        particle.style.setProperty(
            "--touch-r",
            `${rotation}deg`
        );

        particle.style.setProperty(
            "--touch-duration",
            `${.55 + Math.random() * .55}s`
        );

        previewTouches.appendChild(
            particle
        );

        particle.addEventListener(
            "animationend",
            () => particle.remove()
        );
    }
}


normalPreview.addEventListener(
    "mouseenter",
    createTouchParticles
);


/* =========================================================
   ② ↔ ③ 클릭
========================================================= */

normalPreview.addEventListener(
    "click",
    () => {

        const hasPhoto2 =
            Boolean(
                state.normal.photos[1].src
            );

        const hasPhoto3 =
            Boolean(
                state.normal.photos[2].src
            );

        if (
            !hasPhoto2 ||
            !hasPhoto3
        ) {
            return;
        }

        normalPreview.classList.toggle(
            "clicked"
        );

        playBoing();
        createHearts();
    }
);


/* =========================================================
   폴라로이드 사진 불러오기
========================================================= */

polaroidPhoto.addEventListener(
    "change",
    () => {

        const file =
            polaroidPhoto.files[0];

        readImageFile(
            file,
            src => {

                state.polaroid.src =
                    src;

                state.polaroid.x = 0;
                state.polaroid.y = 0;
                state.polaroid.zoom = 1;

                state.polaroid.innerX = 0;
                state.polaroid.innerY = 0;
                state.polaroid.innerZoom = 1;

                state.polaroid.cardX = 0;
                state.polaroid.cardY = 0;

                polaroidBackgroundZoom.value =
                    1;

                polaroidInnerZoom.value =
                    1;

                const message =
                    polaroidCropArea.querySelector(
                        ".empty-message"
                    );

                if (message) {
                    message.style.display =
                        "none";
                }

                polaroidCropImage.onload =
                    () => {
                        updatePolaroidCrop();
                    };

                polaroidCropImage.src =
                    src;

                polaroidPreviewBackground.src =
                    src;

                polaroidInnerImage.src =
                    src;

                updatePolaroidPreview();
                applyCardPosition();

                setTimeout(
                    playPolaroid,
                    100
                );
            }
        );
    }
);


/* =========================================================
   폴라로이드 배경 편집
========================================================= */

function updatePolaroidCrop() {

    if (
        !state.polaroid.src ||
        !polaroidCropImage.naturalWidth
    ) {
        return;
    }

    const size =
        getCoverSize(
            polaroidCropImage,
            polaroidCropArea,
            state.polaroid.zoom
        );

    if (!size) {
        return;
    }

    const position =
        clampPosition(
            state.polaroid.x,
            state.polaroid.y,
            size.width,
            size.height,
            polaroidCropArea
        );

    state.polaroid.x =
        position.x;

    state.polaroid.y =
        position.y;

    polaroidCropImage.style.width =
        `${size.width}px`;

    polaroidCropImage.style.height =
        `${size.height}px`;

    polaroidCropImage.style.transform =
        `translate(-50%, -50%)
         translate(
            ${state.polaroid.x}px,
            ${state.polaroid.y}px
         )`;
}


polaroidBackgroundZoom.addEventListener(
    "input",
    () => {

        state.polaroid.zoom =
            Number(
                polaroidBackgroundZoom.value
            );

        updatePolaroidCrop();
        updatePolaroidPreview();
    }
);


polaroidBackgroundReset.addEventListener(
    "click",
    () => {

        state.polaroid.x = 0;
        state.polaroid.y = 0;
        state.polaroid.zoom = 1;

        polaroidBackgroundZoom.value =
            1;

        updatePolaroidCrop();
        updatePolaroidPreview();
    }
);


/* =========================================================
   폴라로이드 배경 드래그
========================================================= */

let polaroidDragging = false;

let polaroidStartX = 0;
let polaroidStartY = 0;

let polaroidOriginX = 0;
let polaroidOriginY = 0;


polaroidCropArea.addEventListener(
    "pointerdown",
    event => {

        if (!state.polaroid.src) {
            return;
        }

        polaroidDragging = true;

        polaroidStartX =
            event.clientX;

        polaroidStartY =
            event.clientY;

        polaroidOriginX =
            state.polaroid.x;

        polaroidOriginY =
            state.polaroid.y;

        polaroidCropArea.setPointerCapture(
            event.pointerId
        );
    }
);


polaroidCropArea.addEventListener(
    "pointermove",
    event => {

        if (!polaroidDragging) {
            return;
        }

        state.polaroid.x =
            polaroidOriginX +
            (
                event.clientX -
                polaroidStartX
            );

        state.polaroid.y =
            polaroidOriginY +
            (
                event.clientY -
                polaroidStartY
            );

        updatePolaroidCrop();
        updatePolaroidPreview();
    }
);


polaroidCropArea.addEventListener(
    "pointerup",
    () => {
        polaroidDragging = false;
    }
);


polaroidCropArea.addEventListener(
    "pointercancel",
    () => {
        polaroidDragging = false;
    }
);


/* =========================================================
   폴라로이드 미리보기
========================================================= */

function updatePolaroidPreview() {

    if (!state.polaroid.src) {
        return;
    }

    const updateBackground = () => {

        const size =
            getCoverSize(
                polaroidPreviewBackground,
                polaroidPreview,
                state.polaroid.zoom
            );

        if (!size) {
            return;
        }

        const scaleX =
            polaroidPreview.clientWidth /
            (
                polaroidCropArea.clientWidth ||
                1
            );

        const scaleY =
            polaroidPreview.clientHeight /
            (
                polaroidCropArea.clientHeight ||
                1
            );

        polaroidPreviewBackground.style.width =
            `${size.width}px`;

        polaroidPreviewBackground.style.height =
            `${size.height}px`;

        polaroidPreviewBackground.style.left =
            `calc(
                50% +
                ${
                    state.polaroid.x *
                    scaleX
                }px
            )`;

        polaroidPreviewBackground.style.top =
            `calc(
                50% +
                ${
                    state.polaroid.y *
                    scaleY
                }px
            )`;
    };

    if (
        polaroidPreviewBackground.complete
    ) {
        updateBackground();
    } else {
        polaroidPreviewBackground.onload =
            updateBackground;
    }

    polaroidCard.style.width =
        `${polaroidSize.value}%`;

    polaroidCard.style.setProperty(
        "--final-rotation",
        `${polaroidRotation.value}deg`
    );

    state.polaroid.innerZoom =
        Number(
            polaroidInnerZoom.value
        );

    polaroidInnerImage.style.transform =
        `translate(-50%, -50%)
         translate(
            ${state.polaroid.innerX}px,
            ${state.polaroid.innerY}px
         )
         scale(
            ${state.polaroid.innerZoom}
         )`;

    polaroidCaption.textContent =
        captionText.value;

    polaroidCaption.style.fontSize =
        `${captionSize.value}px`;

    polaroidCaption.style.fontFamily =
        captionFont.value;

    polaroidCaption.style.display =
        captionEnabled.checked
            ? "block"
            : "none";

    cameraUI.style.display =
        cameraUiEnabled.checked
            ? "block"
            : "none";

    focusBox.style.display =
        focusEnabled.checked
            ? "block"
            : "none";

    cameraFlash.style.display =
        flashEnabled.checked
            ? "block"
            : "none";

    applyCardPosition();
}


/* =========================================================
   폴라로이드 설정 변경
========================================================= */

[
    polaroidSize,
    polaroidRotation,
    polaroidInnerZoom,
    captionSize,
    captionFont
].forEach(input => {

    input.addEventListener(
        "input",
        updatePolaroidPreview
    );
});


captionText.addEventListener(
    "input",
    updatePolaroidPreview
);


[
    captionEnabled,
    cameraUiEnabled,
    focusEnabled,
    flashEnabled
].forEach(input => {

    input.addEventListener(
        "change",
        updatePolaroidPreview
    );
});


/* =========================================================
   폴라로이드 안쪽 사진 이동
========================================================= */

let innerDragging = false;

let innerStartX = 0;
let innerStartY = 0;

let innerOriginX = 0;
let innerOriginY = 0;


polaroidImageWindow.addEventListener(
    "pointerdown",
    event => {

        if (!state.polaroid.src) {
            return;
        }

        innerDragging = true;

        innerStartX =
            event.clientX;

        innerStartY =
            event.clientY;

        innerOriginX =
            state.polaroid.innerX;

        innerOriginY =
            state.polaroid.innerY;

        polaroidImageWindow.setPointerCapture(
            event.pointerId
        );

        event.stopPropagation();
    }
);


polaroidImageWindow.addEventListener(
    "pointermove",
    event => {

        if (!innerDragging) {
            return;
        }

        state.polaroid.innerX =
            innerOriginX +
            (
                event.clientX -
                innerStartX
            );

        state.polaroid.innerY =
            innerOriginY +
            (
                event.clientY -
                innerStartY
            );

        updatePolaroidPreview();
    }
);


polaroidImageWindow.addEventListener(
    "pointerup",
    () => {
        innerDragging = false;
    }
);


polaroidImageWindow.addEventListener(
    "pointercancel",
    () => {
        innerDragging = false;
    }
);


/* =========================================================
   폴라로이드 카드 이동
========================================================= */

let cardDragging = false;

let cardStartX = 0;
let cardStartY = 0;

let cardOriginX = 0;
let cardOriginY = 0;


polaroidCard.addEventListener(
    "pointerdown",
    event => {

        if (!state.polaroid.src) {
            return;
        }

        if (
            event.target.closest(
                ".polaroid-image-window"
            )
        ) {
            return;
        }

        cardDragging = true;

        cardStartX =
            event.clientX;

        cardStartY =
            event.clientY;

        cardOriginX =
            state.polaroid.cardX;

        cardOriginY =
            state.polaroid.cardY;

        polaroidCard.setPointerCapture(
            event.pointerId
        );
    }
);


polaroidCard.addEventListener(
    "pointermove",
    event => {

        if (!cardDragging) {
            return;
        }

        state.polaroid.cardX =
            cardOriginX +
            (
                event.clientX -
                cardStartX
            );

        state.polaroid.cardY =
            cardOriginY +
            (
                event.clientY -
                cardStartY
            );

        applyCardPosition();
    }
);


polaroidCard.addEventListener(
    "pointerup",
    () => {
        cardDragging = false;
    }
);


polaroidCard.addEventListener(
    "pointercancel",
    () => {
        cardDragging = false;
    }
);


function applyCardPosition() {

    polaroidCard.style.left =
        `calc(
            50% +
            ${state.polaroid.cardX}px
        )`;

    polaroidCard.style.top =
        `calc(
            50% +
            ${state.polaroid.cardY}px
        )`;
}


/* =========================================================
   폴라로이드 재생
========================================================= */

function playPolaroid() {

    if (!state.polaroid.src) {
        return;
    }

    updatePolaroidPreview();
    applyCardPosition();

    polaroidPreview.classList.remove(
        "playing"
    );

    void polaroidPreview.offsetWidth;

    polaroidPreview.classList.add(
        "playing"
    );
}


replayPolaroid.addEventListener(
    "click",
    playPolaroid
);

/* =========================================================
   배포용 이미지 자동 최적화
   - 편집/미리보기 원본은 그대로 유지
   - 배포할 때만 긴 변 최대 2800px로 축소
========================================================= */

function getDeployMaxSize() {

    if (
        deployResolution.value === "original"
    ) {
        return null;
    }

    if (
        deployResolution.value === "custom"
    ) {
        return Math.max(
            320,
            Math.min(
                7680,
                Number(customResolution.value) || 2800
            )
        );
    }

    return Number(
        deployResolution.value
    );
}


deployResolution.addEventListener(
    "change",
    () => {

        customResolutionWrap.classList.toggle(
            "hidden",
            deployResolution.value !== "custom"
        );
    }
);


async function optimizeImageForDeploy(
    dataUrl,
    maxSize = 2800
) {

    if (!dataUrl) {
        return dataUrl;
    }

    if (!maxSize) {
        return dataUrl;
    }

    const img = new Image();

    await new Promise(
        (resolve, reject) => {

            img.onload = resolve;

            img.onerror = () =>
                reject(
                    new Error(
                        "배포용 이미지를 읽지 못했습니다."
                    )
                );

            img.src = dataUrl;
        }
    );


    const originalWidth =
        img.naturalWidth;

    const originalHeight =
        img.naturalHeight;


    /*
       이미 2800px 이하라면
       해상도를 줄이지 않습니다.
    */

const scale =
    Math.min(
        1,
        maxSize / originalWidth,
        maxSize / originalHeight
    );

const width =
    Math.round(
        originalWidth * scale
    );

const height =
    Math.round(
        originalHeight * scale
    );


    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width =
        width;

    canvas.height =
        height;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.imageSmoothingEnabled =
        true;

    ctx.imageSmoothingQuality =
        "high";


    ctx.drawImage(
        img,
        0,
        0,
        width,
        height
    );


    /*
       PNG로 유지합니다.

       따라서 JPEG 품질을 강제로 낮추지 않고
       우선 해상도만 최대 2800px로 줄입니다.
    */

const optimized =
    canvas.toDataURL(
        "image/webp",
        0.95
    );


    console.log(
        `배포 이미지 최적화:
        ${originalWidth}×${originalHeight}
        → ${width}×${height}`
    );


    return optimized;
}
/* =========================================================
   배포 전 검사
========================================================= */

function validateProject() {
    if (state.mode === "story" && getStoryPhotos().length < 2) {
        return { ok: false, message: "스토리 사진을 2장 이상 선택해주세요." };
    }


    if (state.mode === "normal") {

        const missing =
            state.normal.photos.some(
                photo => !photo.src
            );

        if (missing) {

            return {
                ok: false,
                message:
                    "① ② ③ 사진을 모두 선택해주세요."
            };
        }
    }

    if (state.mode === "polaroid") {

        if (!state.polaroid.src) {

            return {
                ok: false,
                message:
                    "폴라로이드 사진을 선택해주세요."
            };
        }
    }

    return {
        ok: true
    };
}


/* =========================================================
   프로젝트 설정 만들기
========================================================= */


/* 스토리 효과 */
const storyUploadSlots=document.getElementById("storyUploadSlots"),
storyAddPhoto=document.getElementById("storyAddPhoto"),
storyPhotoList=document.getElementById("storyPhotoList"),
storyDuration=document.getElementById("storyDuration"),storyTransition=document.getElementById("storyTransition"),
storyAutoPlay=document.getElementById("storyAutoPlay"),storyZoom=document.getElementById("storyZoom"),
storyReset=document.getElementById("storyReset"),storyPreview=document.getElementById("storyPreview"),
storyPreviewImage=document.getElementById("storyPreviewImage"),storyProgress=document.getElementById("storyProgress"),
storyPrev=document.getElementById("storyPrev"),storyNext=document.getElementById("storyNext"),
storyCounter=document.getElementById("storyCounter"),storyEmpty=document.getElementById("storyEmpty"),
storyReplay=document.getElementById("storyReplay"),
storyRatioButtons=document.querySelectorAll(".story-ratio-button"),
storyProfilePhoto=document.getElementById("storyProfilePhoto"),
storyProfileName=document.getElementById("storyProfileName"),
storyProfilePreview=document.getElementById("storyProfilePreview"),
storyProfileNamePreview=document.getElementById("storyProfileNamePreview");

const storyState={slots:[],index:0,timer:null,drag:false,startX:0,startY:0,baseX:0,baseY:0};

function getStoryPhotos(){return storyState.slots.filter(slot=>slot&&slot.src);}

function stopStoryTimer(){if(storyState.timer){clearTimeout(storyState.timer);storyState.timer=null;}}

async function compressStoryImage(file,maxLongSide=2200,quality=.86){
 const raw=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(file);});
 const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=raw;});
 const scale=Math.min(1,maxLongSide/Math.max(img.naturalWidth,img.naturalHeight));
 const c=document.createElement("canvas");c.width=Math.max(1,Math.round(img.naturalWidth*scale));c.height=Math.max(1,Math.round(img.naturalHeight*scale));
 c.getContext("2d",{alpha:false}).drawImage(img,0,0,c.width,c.height);
 return c.toDataURL("image/jpeg",quality);
}
async function setStorySlotFile(slot,file){
 if(!file||!file.type.startsWith("image/"))return;
 try{slot.src=await compressStoryImage(file,2200,.86);slot.name=file.name;slot.x=0;slot.y=0;slot.zoom=1;const photos=getStoryPhotos();storyState.index=Math.max(0,photos.findIndex(p=>p===slot));renderStorySlots();showStoryIndex(storyState.index,"next");}
 catch(e){console.error(e);alert("사진을 불러오지 못했습니다.");}
}
function createStorySlot(photo=null){
    const id=Date.now().toString(36)+Math.random().toString(36).slice(2);
    storyState.slots.push(photo||{id,src:"",name:"",x:0,y:0,zoom:1});
    renderStorySlots();
}

function renderStorySlots(){
    storyUploadSlots.innerHTML="";
    storyState.slots.forEach((slot,slotIndex)=>{
        const wrap=document.createElement("div");
        wrap.className="story-upload-slot"+(slot.src?" has-photo":"");
        const label=document.createElement("label");
        label.className="story-upload-label";
        const thumb=document.createElement("img");
        thumb.className="story-upload-thumb";thumb.alt="";
        if(slot.src)thumb.src=slot.src;
        const icon=document.createElement("div");icon.className="story-upload-icon";icon.textContent="🖼️";
        const title=document.createElement("div");title.className="story-upload-title";title.textContent=`사진 ${slotIndex+1}`;
        const name=document.createElement("div");name.className="story-upload-name";name.textContent=slot.name||"클릭해서 사진 선택";
        const input=document.createElement("input");input.type="file";input.accept="image/*";
        input.addEventListener("change",async e=>{const file=e.target.files&&e.target.files[0];await setStorySlotFile(slot,file);input.value="";});
        ["dragenter","dragover"].forEach(t=>label.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();label.classList.add("drag-over");}));
        ["dragleave","drop"].forEach(t=>label.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();label.classList.remove("drag-over");}));
        label.addEventListener("drop",async e=>{const file=Array.from(e.dataTransfer.files||[]).find(f=>f.type.startsWith("image/"));if(file)await setStorySlotFile(slot,file);});
        label.append(thumb,icon,title,name,input);wrap.appendChild(label);
        if(storyState.slots.length>3){
            const remove=document.createElement("button");remove.type="button";remove.className="story-remove-photo";remove.textContent="이 칸 삭제";
            remove.addEventListener("click",()=>{
                storyState.slots.splice(slotIndex,1);
                const photos=getStoryPhotos();storyState.index=Math.min(storyState.index,Math.max(0,photos.length-1));
                renderStorySlots();showStoryIndex(storyState.index,"next");
            });
            wrap.appendChild(remove);
        }
        storyUploadSlots.appendChild(wrap);
    });
}

function renderStoryPhotoList(){
    if(!storyPhotoList)return;
    storyPhotoList.innerHTML="";
    getStoryPhotos().forEach((p,i)=>{
        const b=document.createElement("button");b.type="button";
        b.className="story-photo-chip"+(i===storyState.index?" active":"");
        b.textContent=`${i+1}. ${p.name}`;
        b.addEventListener("click",()=>showStoryIndex(i,i>=storyState.index?"next":"prev"));
        storyPhotoList.appendChild(b);
    });
}

function renderStoryProgress(){
    const photos=getStoryPhotos();storyProgress.innerHTML="";
    photos.forEach((_,i)=>{
        const b=document.createElement("div");b.className="story-progress-item";
        if(i<storyState.index)b.classList.add("done");if(i===storyState.index)b.classList.add("current");
        const f=document.createElement("div");f.className="story-progress-fill";f.style.setProperty("--story-duration",`${storyDuration.value}s`);
        b.appendChild(f);storyProgress.appendChild(b);
        if(i===storyState.index&&storyAutoPlay.checked&&photos.length>1)requestAnimationFrame(()=>f.classList.add("playing"));
    });
}

function applyStoryTransform(){
    const p=getStoryPhotos()[storyState.index];if(!p)return;
    const z=Number(p.zoom||1);storyPreviewImage.style.setProperty("--story-zoom",z);
    storyPreviewImage.style.transform=`translate(calc(-50% + ${p.x||0}px),calc(-50% + ${p.y||0}px)) scale(${z})`;storyZoom.value=z;
}

function restartStoryTimer(){
    stopStoryTimer();renderStoryProgress();const photos=getStoryPhotos();
    if(state.mode!=="story"||!storyAutoPlay.checked||photos.length<2)return;
    storyState.timer=setTimeout(()=>{if(storyState.index<photos.length-1)showStoryIndex(storyState.index+1,"next");},Number(storyDuration.value)*1000);
}

function showStoryIndex(i,d="next"){
    const photos=getStoryPhotos();
    if(!photos.length){
        storyState.index=0;storyPreviewImage.removeAttribute("src");storyPreviewImage.style.display="none";
        storyCounter.textContent="0 / 0";storyEmpty.classList.remove("hidden");renderStoryProgress();renderStoryPhotoList();return;
    }
    storyState.index=Math.max(0,Math.min(photos.length-1,i));const p=photos[storyState.index];
    storyPreviewImage.style.display="block";storyPreviewImage.src=p.src;storyEmpty.classList.add("hidden");
    storyCounter.textContent=`${storyState.index+1} / ${photos.length}`;
    storyPreviewImage.classList.remove("story-fade","story-slide-next","story-slide-prev","story-zoom");void storyPreviewImage.offsetWidth;
    if(storyTransition.value==="slide")storyPreviewImage.classList.add(d==="prev"?"story-slide-prev":"story-slide-next");
    else if(storyTransition.value==="zoom")storyPreviewImage.classList.add("story-zoom");else storyPreviewImage.classList.add("story-fade");
    applyStoryTransform();renderStoryPhotoList();restartStoryTimer();
}

storyAddPhoto.addEventListener("click",()=>createStorySlot());
storyPrev.addEventListener("click",e=>{e.stopPropagation();if(storyState.index>0)showStoryIndex(storyState.index-1,"prev");else restartStoryTimer();});
storyNext.addEventListener("click",e=>{e.stopPropagation();const p=getStoryPhotos();if(storyState.index<p.length-1)showStoryIndex(storyState.index+1,"next");else restartStoryTimer();});
storyReplay.addEventListener("click",()=>showStoryIndex(0));
storyDuration.addEventListener("input",restartStoryTimer);storyAutoPlay.addEventListener("change",restartStoryTimer);
storyTransition.addEventListener("change",()=>showStoryIndex(storyState.index));
storyZoom.addEventListener("input",()=>{const p=getStoryPhotos()[storyState.index];if(p){p.zoom=Number(storyZoom.value);applyStoryTransform();}});
storyReset.addEventListener("click",()=>{const p=getStoryPhotos()[storyState.index];if(p){p.x=0;p.y=0;p.zoom=1;applyStoryTransform();}});
storyPreview.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")storyPrev.click();if(e.key==="ArrowRight")storyNext.click();});
storyPreview.addEventListener("pointerdown",e=>{if(e.target.closest(".story-nav"))return;const p=getStoryPhotos()[storyState.index];if(!p)return;storyState.drag=true;storyState.startX=e.clientX;storyState.startY=e.clientY;storyState.baseX=p.x||0;storyState.baseY=p.y||0;storyPreview.setPointerCapture(e.pointerId);});
storyPreview.addEventListener("pointermove",e=>{if(!storyState.drag)return;const p=getStoryPhotos()[storyState.index];if(!p)return;p.x=storyState.baseX+e.clientX-storyState.startX;p.y=storyState.baseY+e.clientY-storyState.startY;applyStoryTransform();});
storyPreview.addEventListener("pointerup",()=>storyState.drag=false);storyPreview.addEventListener("pointercancel",()=>storyState.drag=false);


let storyRatio="9:16";storyPreview.dataset.storyRatio=storyRatio;
function applyStoryRatio(){
    storyPreview.dataset.storyRatio=storyRatio;
    storyPreview.style.aspectRatio=storyRatio==="9:16"?"9 / 16":"16 / 9";
    storyPreview.style.height="auto";
}
applyStoryRatio();
storyRatioButtons.forEach(b=>b.addEventListener("click",()=>{
    storyRatio=b.dataset.storyRatio;
    storyRatioButtons.forEach(x=>x.classList.toggle("active",x===b));
    applyStoryRatio();
}));
let storyProfileSrc="";

storyProfileName.addEventListener("input",()=>{
    storyProfileNamePreview.textContent=storyProfileName.value.trim()||"profile_name";
});

storyProfilePhoto.addEventListener("change",async e=>{const file=e.target.files&&e.target.files[0];if(!file||!file.type.startsWith("image/"))return;try{storyProfileSrc=await compressStoryImage(file,512,.84);storyProfilePreview.src=storyProfileSrc;storyProfilePhoto.value="";}catch(error){console.error(error);alert("프로필 사진을 불러오지 못했습니다.");}});
const storyProfileUpload=storyProfilePhoto.closest(".story-profile-upload");
if(storyProfileUpload){["dragenter","dragover"].forEach(t=>storyProfileUpload.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();storyProfileUpload.classList.add("drag-over");}));["dragleave","drop"].forEach(t=>storyProfileUpload.addEventListener(t,e=>{e.preventDefault();e.stopPropagation();storyProfileUpload.classList.remove("drag-over");}));storyProfileUpload.addEventListener("drop",async e=>{const file=Array.from(e.dataTransfer.files||[]).find(f=>f.type.startsWith("image/"));if(file){storyProfileSrc=await compressStoryImage(file,512,.84);storyProfilePreview.src=storyProfileSrc;}});}


for(let i=0;i<2;i++)createStorySlot();
showStoryIndex(0);

function createProjectSettings() {

    return {

        version: 1,

        mode:
            state.mode,

        storyProfile: {
            name:
                storyProfileName.value.trim(),

            photo:
                storyProfileSrc
        },

        ratio:
            state.ratio,

        normal: {

            photos:
                state.normal.photos.map(
                    photo => ({
                        x: photo.x,
                        y: photo.y,
                        zoom: photo.zoom
                    })
                ),

            shine: {
                enabled:
                    shineEnabled.checked,

                power:
                    Number(
                        shinePower.value
                    ),

                speed:
                    Number(
                        shineSpeed.value
                    )
            },

            boing: {
                enabled:
                    boingEnabled.checked,

                power:
                    Number(
                        boingPower.value
                    )
            },

            hearts: {
                enabled:
                    heartEnabled.checked,

                count:
                    Number(
                        heartCount.value
                    ),

                size:
                    Number(
                        heartSize.value
                    ),

                spread:
                    Number(
                        heartSpread.value
                    )
            },

            touch: {
                enabled:
                    touchEnabled.checked,

                type:
                    touchType.value,

                count:
                    Number(touchCount.value),

                size:
                    Number(touchSize.value),

                spread:
                    Number(touchSpread.value)
            }
        },

        polaroid: {

            background: {
                x:
                    state.polaroid.x,

                y:
                    state.polaroid.y,

                zoom:
                    state.polaroid.zoom
            },

            card: {
                x:
                    state.polaroid.cardX,

                y:
                    state.polaroid.cardY,

                size:
                    Number(
                        polaroidSize.value
                    ),

                rotation:
                    Number(
                        polaroidRotation.value
                    )
            },

            inner: {
                x:
                    state.polaroid.innerX,

                y:
                    state.polaroid.innerY,

                zoom:
                    Number(
                        polaroidInnerZoom.value
                    )
            },

            caption: {
                enabled:
                    captionEnabled.checked,

                text:
                    captionText.value,

                size:
                    Number(
                        captionSize.value
                    ),

                font:
                    captionFont.value
            },

            cameraUI:
                cameraUiEnabled.checked,

            focus:
                focusEnabled.checked,

            flash:
                flashEnabled.checked
        }
    };
}


/* =========================================================
   SOOP용 만들기

   현재는 서버 연결 전 단계.
   개발용 완료 문구는 표시하지 않습니다.
========================================================= */

exportButton.addEventListener("click", async () => {
    const validation = validateProject();

    if (!validation.ok) {
        alert(validation.message);
        return;
    }

    exportResult.classList.add("hidden");
    uploadStatus.classList.remove("hidden");

    uploadStatusTitle.textContent = "⏳ 배포 중...";
    uploadStatusText.textContent =
        "GitHub Pages에 결과물을 만들고 있습니다.";

    exportButton.disabled = true;

    try {
        /*
         * 현재 편집기에서 선택한 사진과 효과가 들어 있는
         * 미리보기 영역을 독립 실행 HTML로 만듭니다.
         */
        const source =
            state.mode === "normal"
                ? normalPreview
                : state.mode === "polaroid"
                    ? polaroidPreview
                    : storyPreview;

        const clone = source.cloneNode(true);

        /*
         * 이미지가 data URL로 들어 있으므로 clone에도 그대로
         * 포함됩니다.
         */
      /*
 * 배포본에 들어가는 이미지만 최적화합니다.
 * 원본 및 편집 화면의 이미지는 변경하지 않습니다.
 *
 * 긴 변이 2800px를 넘는 이미지만 축소되고,
 * 2800px 이하 이미지는 그대로 사용합니다.
 */

const cloneImages =
    clone.querySelectorAll("img");

const originalImages =
    source.querySelectorAll("img");

for (
    let index = 0;
    index < cloneImages.length;
    index++
) {
    const img =
        cloneImages[index];

    const original =
        originalImages[index];

    if (
        original &&
        original.src
    ) {
        img.src =
            await optimizeImageForDeploy(
                original.src,
                getDeployMaxSize()
            );
    }
}

        /*
         * 현재 페이지의 CSS를 결과 페이지에도 넣습니다.
         */
        let css = "";

        for (const sheet of document.styleSheets) {
            try {
                for (const rule of sheet.cssRules) {
                    css += rule.cssText + "\n";
                }
            } catch (error) {
                console.warn(
                    "일부 CSS를 읽지 못했습니다.",
                    error
                );
            }
        }

        const [ratioWidth, ratioHeight] =
            ratioMap[state.ratio];

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>SOOP Effect</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&family=Dongle:wght@300;400;700&family=Gaegu:wght@300;400;700&family=Gamja+Flower&family=Gowun+Dodum&family=Hi+Melody&family=Jua&family=Single+Day&family=Galmuri11&display=swap" rel="stylesheet">

<style>
${css}


/* =====================================================
   배포 페이지 전용
===================================================== */

html,
body {
    margin: 0 !important;
    padding: 0 !important;

    width: 100%;
    height: 100%;

    overflow: hidden;

    background: transparent !important;
}


body {
    position: relative;
}


#soop-effect-root {
    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;

    overflow: hidden;

    background: transparent;

    user-select: none;
    -webkit-user-select: none;
}


/* =====================================================
   미리보기 전체를 iframe 크기에 맞춤
===================================================== */

#soop-effect-root > .normal-preview,
#soop-effect-root > .polaroid-preview,
#soop-effect-root > .story-preview {

    position: absolute !important;

    inset: 0 !important;

    width: 100% !important;
    height: 100% !important;

    max-width: none !important;
    max-height: none !important;

    margin: 0 !important;
    padding: 0 !important;

    border-radius: 18px !important;

    aspect-ratio:
        ${ratioWidth} / ${ratioHeight} !important;

    overflow: hidden !important;
}


/* =====================================================
   일반 사진
===================================================== */

#soop-effect-root .preview-photo {

    position: absolute !important;

    left: 50% !important;
    top: 50% !important;

    max-width: none !important;
    max-height: none !important;

    transform-origin:
        center center !important;

    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
}


/* =====================================================
   폴라로이드 배포 전용

   기존 편집기 크기에 묶이지 않고
   iframe 전체를 기준으로 다시 계산합니다.
===================================================== */

#soop-effect-root > .polaroid-preview {

    background: transparent !important;
}


#soop-effect-root .polaroid-preview-background,
#soop-effect-root #polaroidPreviewBackground {

    position: absolute !important;

    max-width: none !important;
    max-height: none !important;

    transform: translate(-50%, -50%) !important;

    transform-origin: center center !important;

    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
}


#soop-effect-root .polaroid-card,
#soop-effect-root #polaroidCard {

    transform-origin: center center;
}


#soop-effect-root .polaroid-inner-image,
#soop-effect-root #polaroidInnerImage {

    max-width: none !important;
    max-height: none !important;

    image-rendering: auto;

    -webkit-user-drag: none;
    user-select: none;
}

</style>
</head>


<body>

<div id="soop-effect-root">
${clone.outerHTML}
</div>


<script>
(() => {

    const root =
        document.getElementById(
            "soop-effect-root"
        );


    /* =================================================
       모드 찾기
    ================================================= */

    const normalPreview =
        root.querySelector(
            ".normal-preview"
        );


    const polaroidPreview =
        root.querySelector(
            ".polaroid-preview"
        );

    const storyPreview =
        root.querySelector(".story-preview");

    if (storyPreview) {
        const image=storyPreview.querySelector(".story-preview-image");
        const progress=storyPreview.querySelector(".story-progress");
        const counter=storyPreview.querySelector(".story-counter");
        const prev=storyPreview.querySelector(".story-nav-prev");
        const next=storyPreview.querySelector(".story-nav-next");
        const empty=storyPreview.querySelector(".story-empty");
        const photos=${JSON.stringify(getStoryPhotos().map(p=>({src:p.src,x:p.x||0,y:p.y||0,zoom:p.zoom||1})))};
        const duration=${Number(storyDuration.value)};
        const transition=${JSON.stringify(storyTransition.value)};
        const autoPlay=${storyAutoPlay.checked ? "true" : "false"};
        let index=0,timer=null;
        function bars(){progress.innerHTML="";photos.forEach((_,i)=>{const b=document.createElement("div");b.className="story-progress-item";if(i<index)b.classList.add("done");if(i===index)b.classList.add("current");const f=document.createElement("div");f.className="story-progress-fill";f.style.setProperty("--story-duration",duration+"s");b.appendChild(f);progress.appendChild(b);if(i===index&&autoPlay&&photos.length>1)requestAnimationFrame(()=>f.classList.add("playing"));});}
        function restart(){if(timer)clearTimeout(timer);bars();if(!autoPlay||photos.length<2)return;timer=setTimeout(()=>{if(index<photos.length-1)show(index+1,"next");},duration*1000);}
        function show(i,d){if(!photos.length)return;index=Math.max(0,Math.min(photos.length-1,i));const p=photos[index];image.src=p.src;if(empty)empty.style.display="none";image.style.setProperty("--story-zoom",p.zoom||1);image.style.transform="translate(calc(-50% + "+(p.x||0)+"px),calc(-50% + "+(p.y||0)+"px)) scale("+(p.zoom||1)+")";image.classList.remove("story-fade","story-slide-next","story-slide-prev","story-zoom");void image.offsetWidth;if(transition==="slide")image.classList.add(d==="prev"?"story-slide-prev":"story-slide-next");else if(transition==="zoom")image.classList.add("story-zoom");else image.classList.add("story-fade");counter.textContent=(index+1)+" / "+photos.length;restart();}
        prev.addEventListener("click",e=>{e.stopPropagation();if(index>0)show(index-1,"prev");else restart();});
        next.addEventListener("click",e=>{e.stopPropagation();if(index<photos.length-1)show(index+1,"next");else restart();});
        show(0,"next");
    }



    /* =================================================
       일반 모드

       현재 정상 작동 중인 코드를 그대로 유지합니다.
    ================================================= */

    if (normalPreview) {

        const preview =
            normalPreview;


        const photos = [
            ${JSON.stringify({
                x: state.normal.photos[0].x,
                y: state.normal.photos[0].y,
                zoom: state.normal.photos[0].zoom
            })},

            ${JSON.stringify({
                x: state.normal.photos[1].x,
                y: state.normal.photos[1].y,
                zoom: state.normal.photos[1].zoom
            })},

            ${JSON.stringify({
                x: state.normal.photos[2].x,
                y: state.normal.photos[2].y,
                zoom: state.normal.photos[2].zoom
            })}
        ];


        const editorWidth =
            ${Math.max(normalPreview.clientWidth, 1)};

        const editorHeight =
            ${Math.max(normalPreview.clientHeight, 1)};


        const previewPhotos = [
            preview.querySelector(
                ".preview-photo1"
            ),

            preview.querySelector(
                ".preview-photo2"
            ),

            preview.querySelector(
                ".preview-photo3"
            )
        ];


        const shine =
            preview.querySelector(
                ".preview-shine"
            );


        const hearts =
            preview.querySelector(
                ".preview-hearts"
            );


        const touches =
            preview.querySelector(
                ".preview-touches"
            );


        /* =============================================
           일반 사진 크기
        ============================================= */

        function updatePhotos() {

            const cw =
                preview.clientWidth;

            const ch =
                preview.clientHeight;


            if (!cw || !ch) {
                return;
            }


            const scaleX =
                cw / editorWidth;

            const scaleY =
                ch / editorHeight;


            previewPhotos.forEach(
                (img, index) => {

                    if (
                        !img ||
                        !img.src
                    ) {
                        return;
                    }


                    const update = () => {

                        if (
                            !img.naturalWidth ||
                            !img.naturalHeight
                        ) {
                            return;
                        }


                        const photo =
                            photos[index];


                        const scale =
                            Math.max(
                                cw /
                                    img.naturalWidth,

                                ch /
                                    img.naturalHeight
                            ) *
                            photo.zoom;


                        const width =
                            img.naturalWidth *
                            scale;


                        const height =
                            img.naturalHeight *
                            scale;


                        img.style.width =
                            width + "px";


                        img.style.height =
                            height + "px";


                        img.style.left =
                            "50%";


                        img.style.top =
                            "50%";


                        img.style.transform =
                            "translate(-50%, -50%) " +
                            "translate(" +
                            (
                                photo.x *
                                scaleX
                            ) +
                            "px, " +
                            (
                                photo.y *
                                scaleY
                            ) +
                            "px)";
                    };


                    if (
                        img.complete &&
                        img.naturalWidth
                    ) {

                        update();

                    } else {

                        img.addEventListener(
                            "load",
                            update,
                            {
                                once: true
                            }
                        );
                    }
                }
            );
        }


        /* =============================================
           광택 - 일반 모드 전용
        ============================================= */

        const shineOn =
            ${shineEnabled.checked ? "true" : "false"};

        const shinePowerValue =
            ${Number(shinePower.value)};

        const shineSpeedValue =
            ${Number(shineSpeed.value)};


        function playShine() {

            if (
                !shineOn ||
                !shine
            ) {
                return;
            }


            shine.style.animation =
                "none";


            shine.style.opacity =
                String(
                    shinePowerValue
                );


            void shine.offsetWidth;


            shine.style.animation =
                "shineMove " +
                shineSpeedValue +
                "s ease-out";
        }


        /* =============================================
           보잉 - 일반 모드 전용
        ============================================= */

        const boingOn =
            ${boingEnabled.checked ? "true" : "false"};

        const boingPowerValue =
            ${Number(boingPower.value)};


        function playBoing() {

            if (!boingOn) {
                return;
            }


            preview.style.setProperty(
                "--boing",
                String(
                    boingPowerValue
                )
            );


            preview.style.animation =
                "none";


            void preview.offsetWidth;


            preview.style.animation =
                "previewBoing .58s ease-out";
        }


        /* =============================================
           하트 - 일반 모드 전용
        ============================================= */

        const heartsOn =
            ${heartEnabled.checked ? "true" : "false"};

        const heartCountValue =
            ${Number(heartCount.value)};

        const heartSizeValue =
            ${Number(heartSize.value)};

        const heartSpreadValue =
            ${Number(heartSpread.value)};


        function createHearts() {

            if (
                !heartsOn ||
                !hearts
            ) {
                return;
            }


            const symbols = [
                "♥",
                "♡",
                "💗",
                "💕"
            ];


            for (
                let i = 0;
                i < heartCountValue;
                i++
            ) {

                const heart =
                    document.createElement(
                        "span"
                    );


                heart.className =
                    "heart";


                heart.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    heartSpreadValue *
                    (
                        0.35 +
                        Math.random() *
                        0.65
                    );


                const x =
                    Math.cos(angle) *
                    distance;


                const y =
                    Math.sin(angle) *
                    distance;


                const rotation =
                    -90 +
                    Math.random() *
                    180;


                const actualSize =
                    heartSizeValue *
                    (
                        0.65 +
                        Math.random() *
                        0.75
                    );


                heart.style.fontSize =
                    actualSize +
                    "px";


                heart.style.color =
                    Math.random() > 0.5
                        ? "#ff6fae"
                        : "#ff9ac5";


                heart.style.setProperty(
                    "--heart-x",
                    x + "px"
                );


                heart.style.setProperty(
                    "--heart-y",
                    y + "px"
                );


                heart.style.setProperty(
                    "--heart-r",
                    rotation + "deg"
                );


                heart.style.setProperty(
                    "--heart-duration",
                    (
                        0.65 +
                        Math.random() *
                        0.55
                    ) +
                    "s"
                );


                hearts.appendChild(
                    heart
                );


                heart.addEventListener(
                    "animationend",
                    () => {
                        heart.remove();
                    }
                );
            }
        }


        /* =============================================
           마우스 오버 터치 효과
        ============================================= */

        const touchOn =
            ${touchEnabled.checked ? "true" : "false"};

        const touchTypeValue =
            ${JSON.stringify(touchType.value)};

        const touchCountValue =
            ${Number(touchCount.value)};

        const touchSizeValue =
            ${Number(touchSize.value)};

        const touchSpreadValue =
            ${Number(touchSpread.value)};


        function createTouchParticles() {

            if (
                !touchOn ||
                !touches
            ) {
                return;
            }

            for (
                let i = 0;
                i < touchCountValue;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );

                particle.className =
                    "touch-particle touch-" +
                    touchTypeValue;

                if (
                    touchTypeValue === "star"
                ) {
                    particle.textContent =
                        Math.random() > .45
                            ? "✦"
                            : "✧";
                }

                const angle =
                    Math.random() *
                    Math.PI *
                    2;

                const distance =
                    touchSpreadValue *
                    (
                        .2 +
                        Math.random() * .8
                    );

                const x =
                    Math.cos(angle) *
                    distance;

                const y =
                    Math.sin(angle) *
                    distance;

                const actualSize =
                    touchSizeValue *
                    (
                        .55 +
                        Math.random() * .8
                    );

                const rotation =
                    -90 +
                    Math.random() * 180;

                particle.style.fontSize =
                    actualSize + "px";

                if (
                    touchTypeValue !== "star"
                ) {
                    const dotSize =
                        Math.max(
                            3,
                            actualSize *
                            (
                                touchTypeValue === "light"
                                    ? .34
                                    : .18
                            )
                        );

                    particle.style.width =
                        dotSize + "px";

                    particle.style.height =
                        dotSize + "px";
                }

                particle.style.setProperty(
                    "--touch-x",
                    x + "px"
                );

                particle.style.setProperty(
                    "--touch-y",
                    y + "px"
                );

                particle.style.setProperty(
                    "--touch-r",
                    rotation + "deg"
                );

                particle.style.setProperty(
                    "--touch-duration",
                    (
                        .55 +
                        Math.random() * .55
                    ) +
                    "s"
                );

                touches.appendChild(
                    particle
                );

                particle.addEventListener(
                    "animationend",
                    () => particle.remove()
                );
            }
        }


        /* =============================================
           ① → ② + 광택
        ============================================= */

        preview.addEventListener(
            "mouseenter",
            () => {

                preview.classList.remove(
                    "clicked"
                );

                playShine();

                createTouchParticles();
            }
        );


        /* =============================================
           클릭 → ③ + 보잉 + 하트
        ============================================= */

        preview.addEventListener(
            "click",
            () => {

                const photo2 =
                    previewPhotos[1];


                const photo3 =
                    previewPhotos[2];


                if (
                    !photo2 ||
                    !photo3 ||
                    !photo2.getAttribute(
                        "src"
                    ) ||
                    !photo3.getAttribute(
                        "src"
                    )
                ) {
                    return;
                }


                preview.classList.add(
                    "clicked"
                );


                playBoing();

                createHearts();
            }
        );


        /* =============================================
           마우스를 떼면 ①
        ============================================= */

        preview.addEventListener(
            "mouseleave",
            () => {

                preview.classList.remove(
                    "clicked"
                );

                playShine();
            }
        );


        updatePhotos();


        window.addEventListener(
            "resize",
            updatePhotos
        );
    }


    /* =================================================
       폴라로이드 모드

       중요:
       이 블록에는 광택 / 보잉 / 하트 코드가 없습니다.
    ================================================= */

    if (polaroidPreview) {

        const preview =
            polaroidPreview;


        const background =
            preview.querySelector(
                "#polaroidPreviewBackground"
            ) ||
            preview.querySelector(
                ".polaroid-preview-background"
            );


        const card =
            preview.querySelector(
                "#polaroidCard"
            ) ||
            preview.querySelector(
                ".polaroid-card"
            );


        const innerImage =
            preview.querySelector(
                "#polaroidInnerImage"
            ) ||
            preview.querySelector(
                ".polaroid-inner-image"
            );


        /*
         * 생성기에서 폴라로이드 미리보기의
         * 실제 기준 크기
         */

        const editorWidth =
            ${Math.max(polaroidPreview.clientWidth, 1)};

        const editorHeight =
            ${Math.max(polaroidPreview.clientHeight, 1)};


        /*
         * 현재 폴라로이드 설정을
         * 배포 페이지 안에 저장
         */

        const settings = ${JSON.stringify({
            x: state.polaroid.x,
            y: state.polaroid.y,
            zoom: state.polaroid.zoom,
            cardX: state.polaroid.cardX,
            cardY: state.polaroid.cardY,
            innerX: state.polaroid.innerX,
            innerY: state.polaroid.innerY,
            innerZoom: state.polaroid.innerZoom
        })};


        /* =============================================
           폴라로이드 크기/위치 다시 계산
        ============================================= */

        function updatePolaroidLayout() {

            const cw =
                preview.clientWidth;


            const ch =
                preview.clientHeight;


            if (
                !cw ||
                !ch
            ) {
                return;
            }


            const scaleX =
                cw / editorWidth;


            const scaleY =
                ch / editorHeight;


            const uniformScale =
                Math.min(
                    scaleX,
                    scaleY
                );


            /* =========================================
               배경 사진

               iframe 전체를 cover 방식으로 채웁니다.
               검은 여백 방지.
            ========================================= */

            if (background) {

                const updateBackground =
                    () => {

                        if (
                            !background.naturalWidth ||
                            !background.naturalHeight
                        ) {
                            return;
                        }


                        const coverScale =
                            Math.max(
                                cw /
                                    background.naturalWidth,

                                ch /
                                    background.naturalHeight
                            ) *
                            settings.zoom;


                        const width =
                            background.naturalWidth *
                            coverScale;


                        const height =
                            background.naturalHeight *
                            coverScale;


                        background.style.width =
                            width + "px";


                        background.style.height =
                            height + "px";


                        background.style.left =
                            "calc(50% + " +
                            (
                                settings.x *
                                scaleX
                            ) +
                            "px)";


                        background.style.top =
                            "calc(50% + " +
                            (
                                settings.y *
                                scaleY
                            ) +
                            "px)";


                        background.style.transform =
                            "translate(-50%, -50%)";
                    };


                if (
                    background.complete &&
                    background.naturalWidth
                ) {

                    updateBackground();

                } else {

                    background.addEventListener(
                        "load",
                        updateBackground,
                        {
                            once: true
                        }
                    );
                }
            }


            /* =========================================
               폴라로이드 카드 위치

               생성기에서 정한 위치를
               iframe 크기에 맞게 비례 조정합니다.
            ========================================= */

            if (card) {

                card.style.left =
                    "calc(50% + " +
                    (
                        settings.cardX *
                        scaleX
                    ) +
                    "px)";


                card.style.top =
                    "calc(50% + " +
                    (
                        settings.cardY *
                        scaleY
                    ) +
                    "px)";
            }


            /* =========================================
               카드 안쪽 사진

               기존 편집 위치와 확대값은 유지하면서
               SOOP 크기에 맞춰 이동값만 보정합니다.

               이미지 자체는 최적화된 고해상도 원본을
               그대로 사용합니다.
            ========================================= */

            if (innerImage) {

                innerImage.style.transform =
                    "translate(-50%, -50%) " +
                    "translate(" +
                    (
                        settings.innerX *
                        uniformScale
                    ) +
                    "px, " +
                    (
                        settings.innerY *
                        uniformScale
                    ) +
                    "px) " +
                    "scale(" +
                    settings.innerZoom +
                    ")";
            }
        }


        /* =============================================
           클릭할 때마다 폴라로이드 재생

           일반 모드 효과는 실행하지 않습니다.
        ============================================= */

        function replayPolaroid() {

            preview.classList.remove(
                "playing"
            );


            void preview.offsetWidth;


            preview.classList.add(
                "playing"
            );
        }


        preview.addEventListener(
            "click",
            replayPolaroid
        );


        /* =============================================
           최초 배치
        ============================================= */

        updatePolaroidLayout();


        /*
         * 이미지가 조금 늦게 로드되는 경우를 위해
         * 한 번 더 계산합니다.
         */

        requestAnimationFrame(
            updatePolaroidLayout
        );


        window.addEventListener(
            "load",
            updatePolaroidLayout
        );


        window.addEventListener(
            "resize",
            updatePolaroidLayout
        );
    }

})();
</script>

</body>
</html>`;

        uploadStatusTitle.textContent =
            "⏳ GitHub에 업로드 중...";

        uploadStatusText.textContent =
            "잠시만 기다려주세요.";

        const response = await fetch(
            "https://soop-effect-api.wr7881.workers.dev/deploy",
            {
                method: "POST",

                headers: {
    "Content-Type": "application/json",
    "Authorization":
        `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY) || ""}`
},

                body: JSON.stringify({
                    html,
                    ratio: state.ratio
                })
            }
        );

        let result;

        try {
            result = await response.json();
        } catch (error) {
            throw new Error(
                `서버 응답을 읽지 못했습니다. (${response.status})`
            );
        }

        if (!response.ok || !result.ok) {
            throw new Error(
                result.error ||
                `배포 실패 (${response.status})`
            );
        }

        /*
         * Worker가 만들어 준 iframe 코드를 그대로 사용합니다.
         */
        iframeCode.value =
            result.iframeCode ||
            createIframeCode(result.publicUrl);

        uploadStatus.classList.add("hidden");

        exportResult.classList.remove("hidden");

        /*
         * 결과 영역까지 자동 이동
         */
        exportResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        console.log(
            "SOOP 배포 성공:",
            result
        );

    } catch (error) {
        console.error(error);

        uploadStatus.classList.remove("hidden");

        uploadStatusTitle.textContent =
            "⚠ 배포에 실패했습니다";

        uploadStatusText.textContent =
            error?.message ||
            "잠시 후 다시 시도해주세요.";

    } finally {
        exportButton.disabled = false;
    }
});


/* =========================================================
   최종 iframe 생성

   서버 연결 후 사용됩니다.
========================================================= */

function createIframeCode(publicUrl) {

    const [widthRatio, heightRatio] =
        ratioMap[state.ratio];

    return `<iframe
  src="${publicUrl}"
  width="100%"
  style="width:100%; aspect-ratio:${widthRatio}/${heightRatio}; border:0; display:block;"
  scrolling="no"
  frameborder="0">
</iframe>`;
}


/* =========================================================
   SOOP 코드 복사
========================================================= */

copyIframe.addEventListener(
    "click",
    async () => {

        const code =
            iframeCode.value.trim();

        if (!code) {

            alert(
                "아직 SOOP 코드가 생성되지 않았습니다."
            );

            return;
        }

        try {

            await navigator.clipboard.writeText(
                code
            );

            const oldText =
                copyIframe.textContent;

            copyIframe.textContent =
                "✓ 복사 완료";

            setTimeout(
                () => {
                    copyIframe.textContent =
                        oldText;
                },
                1400
            );

        } catch (error) {

            iframeCode.select();

            document.execCommand(
                "copy"
            );

            alert(
                "SOOP 코드가 복사되었습니다."
            );
        }
    }
);


/* =========================================================
   창 크기 변경
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateNormalCrop();
        updateNormalPreview();

        updatePolaroidCrop();
        updatePolaroidPreview();
    }
);


/* =========================================================
   최초 실행
========================================================= */

applyRatio();
loadSelectedNormalPhoto();
updateNormalPreview();
