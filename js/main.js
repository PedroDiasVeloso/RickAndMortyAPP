require.config({
    baseUrl: ''
})

require(['router'], function(router){
    $(document).ready(router.init);
})