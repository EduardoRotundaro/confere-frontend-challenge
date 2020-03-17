import {toast} from 'react-toastify';

export function updatePageTitle(page) {
    const [, APP] = document.title.split(' | ');
    document.title = `${page} | ${APP}`;
}

export async function isAValidImageURL(url) {
    return new Promise((resolve) => {       
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

export function showErrorToast() {
    toast.error(
        '❌ Algo deu errado! Tente novamente...',
        {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 4000,
            pauseOnHover: true,
            closeOnClick: true
        }
    );
}
