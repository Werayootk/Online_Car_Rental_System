import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";

/**
 * Example
 * <Link to="/account?name=netflix">Netflix</Link>
 * <Child name={query.get("name")} />
 * https://v5.reactrouter.com/web/example/query-parameters
 */

const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default useQuery;