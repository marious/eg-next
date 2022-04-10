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
            .map((k) => {
                if (k === 'type') {
                    return `${k}.slug:${parsedValues[k]}`
                }
                if (k === 'category') {
                    return `categories.slug:${parsedValues[k]}`
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
            .slice(0, -1)
    }

    find(params) {
        const {
            type,
            text: name,
            category,
            tags,
            variations,
            status,
            is_active,
            shop_id,
            limit = 30,
            sortedBy="Desc",
            orderBy = "created_at",
            min_price,
            max_price,
        } = params;

        const searchString = this.stringifySearchValue({
            type,
            name,
            category,
            tags,
            variations,
            status,
            shop_id,
            is_active,
            min_price,
            max_price,
        });
         const queryString = `?search=${searchString}&searchJoin=and&limit=${limit}&sortedBy=${sortedBy}&orderBy=${orderBy}`;
        return this.http.get(this._base_path + queryString);    
    }

    findAll() {
        return this.http.get(this.base_path)
    }

    fetchUrl(url) {
        return this.http.get(url);
    }

    postUrl(url, data) {
        return this.http.post(url, data);
    }

    findOne(id) {
        return this.http.get(`${this._base_path}/${id}`)
    }
    findRelated(id) {
        return this.http.get(`${this._base_path}/related/${id}`)
    }

    // findBySlug(slug) {
    //     return this.http.get()
    // }
}