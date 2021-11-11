import moment from 'moment';
import _ from'lodash';

export const notifyWarning = (message, title) => {
  this.$vs.notify({
    title: title,
    text: message,
    iconPack: 'feather',
    icon: 'icon-alert-circle',
    color: 'warning'
  })
};

export const getDate = (date) => {
  return moment(date.join('/')).format('DD MMMM YYYY');
};

export const queryString = (params) => Object.keys(params).map(key => key + '=' + params[key]).join('&');

export const createFormData = (payload) => {
  let formData = new FormData();
  _.forEach(payload, (value, key) => {
    formData.append(key, value);
  });
  return formData;
}
