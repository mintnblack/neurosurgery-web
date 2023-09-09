
const alertContainer = document.getElementById('alertContainer');
const alertContent = document.getElementById('alertContent');

export const setAlertAction = (alertMessage, alertType) => {
    let alertClass = '';
    if (alertType === 'success') {
        alertClass = 'alert-success';
    }else if(alertType === 'danger'){
        alertClass = 'alert-danger';
    }else if(alertType === 'warning'){
        alertClass = 'alert-warning';
    }else if (alertType === 'info'){
        alertClass = 'alert-primary';
    }
    alertContent.classList = [];
    alertContent.classList.add(alertClass);
    alertContent.innerHTML = alertMessage;
    alertContainer.style.display = 'block';
    setTimeout(() => {
        alertContainer.style.display = 'none';
        alertContainer.classList.remove(alertClass);
    }, 3000);
};
