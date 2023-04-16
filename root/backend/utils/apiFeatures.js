class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // building the query
    const queryObject = { ...this.queryString };
    // exclude the keyword fields from the query
    // this will prevent the query from breaking when we are only trying to filter
    const excludeParamsArr = ['page', 'sort', 'limit', 'fields'];
    excludeParamsArr.forEach((el) => delete queryObject[el]);

    // For advance filtering we can see from req.query below that $ is missing.
    // { difficulty: 'easy', duration: { lte: '2' } }
    // The correct output for the query to work should be:
    // { difficulty: 'easy', duration: { $lte: '2' } }

    const filterQuery = JSON.parse(
      JSON.stringify(queryObject).replace(
        /\b(gt|gte|lt|lte)\b/,
        (match) => `$${match}`
      )
    );

    console.log(this.queryString, filterQuery);

    this.query = this.query.find(filterQuery);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(this.queryString, sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt _id');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      console.log(this.queryString, fields);
      this.query = this.query.select(fields);
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
