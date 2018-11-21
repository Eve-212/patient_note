export default function ($sc) {
    $sc._list = $sc.list;
    $sc._sess = $sc.sess;
    Object.assign($sc, {
      sess_cache: {},
      list($param) {
        return this._list($param).then($raw => {
          for (let $sess in $raw.data) {
            this.sess_cache[$sess.fee_no] = $sess;
          }
          return $raw;
        });
      },
      sess($param) {
        return this._sess($param).then($raw => {
          let $sess = $raw.data;
          if ($sess.fee_no) {
            this.sess_cache[$sess.fee_no] = $sess;
          }
          return $raw;
        });
      }
    })
  }