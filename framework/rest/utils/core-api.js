import pickBy from 'lodash/pickBy';
import Request, { makeGet } from './request';

export class CoreApi {
    http = Request;

    constructor(_base_path, locale = 'en') {
        this._base_path = _base_path;
        this.locale = locale;
    }

    stringifySearchValue(values) {
        const parsedValues = pickBy(values);
        return Object.keys(parsedValues)
            .map(k => {
                if (k === 'type') {
                    return `${k}.slug:${parsedValues[k]}`;
                }
                if (k === 'category') {
                    return `categories.slug:${parsedValues[k]}`;
                }
                if (k === 'tags') {
                    return `tags.slug:${parsedValues[k]}`;
                }
                if (k === 'variations') {
                    return `variations.value:${parsedValues[k]};`;
                }
                return `${k}:${parsedValues[k]};`;
            })
            .join('')
            .slice(0, -1);
    }

    find(params) {
        const {
            locale,
            category,
            brand,
            sortedBy = 'Desc',
            orderBy = 'created_at',
            minPrice,
            maxPrice,
            keyword,
        } = params;

        // const searchString = this.stringifySearchValue({
        //     category,
        //     brand,
        //     minPrice,
        //     maxPrice,
        //     keyword,
        // });
        const queryString = params
            ? `/search?&category=${category ? category : ''}&brand=${
                  brand ? brand : ''
              }&minPrice=${minPrice ? minPrice : ''}&keyword=${
                  keyword ? keyword : ''
              }&maxPrice=${
                  maxPrice ? maxPrice : ''
              }&sortedBy=${sortedBy}&orderBy=${orderBy}`
            : '';

        return makeGet(this._base_path + queryString, locale);
    }

    findAll() {
        return makeGet(this._base_path);
    }

    fetchUrl(url) {
        return makeGet(url);
    }

    postUrl(url, data) {
        return this.http.post(url, data);
    }

    findOne(id) {
        return makeGet(`${this._base_path}/${id}`);
    }
    findRelated(id) {
        return makeGet(`${this._base_path}/related/${id}`);
    }

    create(data, options = {}) {
        return this.http
            .post(`${this._base_path}`, data, options)
            .then(res => res.data);
    }

    update(id, data) {
        return this.http
            .put(`${this._base_path}/${id}`, data)
            .then(res => res.data);
    }

    delete(id) {
        return this.http.delete(`${this._base_path}/${id}`);
    }
}
