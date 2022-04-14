import pickBy from 'lodash/pickBy';
import Request from './request';

export class CoreApi {
    http = Request;

    constructor(_base_path) {
        this._base_path = _base_path;
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
            category,
            brand,
            sortedBy = 'Desc',
            orderBy = 'created_at',
            minPrice,
            maxPrice,
            keyword,
        } = params;

        const searchString = this.stringifySearchValue({
            category,
            brand,
            minPrice,
            maxPrice,
            keyword,
        });
        const queryString = params
            ? `/search?&category=${category}&brand=${brand}&minPrice=${minPrice}&keyword=${keyword}&maxPrice=${maxPrice}&sortedBy=${sortedBy}&orderBy=${orderBy}`
            : '';

        return this.http.get(this._base_path + queryString);
    }

    findAll() {
        return this.http.get(this._base_path);
    }

    fetchUrl(url) {
        return this.http.get(url);
    }

    postUrl(url, data) {
        return this.http.post(url, data);
    }

    findOne(id) {
        return this.http.get(`${this._base_path}/${id}`);
    }
    findRelated(id) {
        return this.http.get(`${this._base_path}/related/${id}`);
    }

    // findBySlug(slug) {
    //     return this.http.get()
    // }
}
