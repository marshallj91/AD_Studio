$(function() {
        function bio_display(actor){    
                    $(actor).modal('show')
                    };

        $("#actor1-bio").on('hidden.bs.modal', function (e) 
        {
            $("#actor1-bio iframe").attr("src", $("#actor1-bio iframe").attr("src"));
        });

        $("#actor2-bio").on('hidden.bs.modal', function (e) {
            $("#actor2-bio iframe").attr("src", $("#actor1-bio iframe").attr("src"));
        });
        
        $("#actor3-bio").on('hidden.bs.modal', function (e) {
            $("#actor3-bio iframe").attr("src", $("#actor1-bio iframe").attr("src"));
        });

});
