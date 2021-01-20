const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');


    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

    const messages = {
        loadind: 'Загрузка...', 
        success: 'Спасибо! скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messages.loadind;

        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessages = document.createElement('div');
            statusMessages.classList.add('status');
            item.appendChild(statusMessages);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessages.textContent = messages.success;
                })
                .catch(() => statusMessages.textContent = messages.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessages.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;