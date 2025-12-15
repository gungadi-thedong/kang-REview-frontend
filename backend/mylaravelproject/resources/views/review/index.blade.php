<!DOCTYPE html>
<html>
<head>
    <title>Reviews</title>
</head>
<body>

<h1>All Reviews</h1>

@if($reviews->isEmpty())
    <p>No reviews found.</p>
@else
    @foreach ($reviews as $review)
        <hr>

        <h2>{{ $review->judul }}</h2>

        <p><strong>Pembuka:</strong></p>
        <p>{{ $review->paragraf_buka }}</p>

        @if($review->gambar_1)
             <img 
            src="{{ asset('storage/' . $review->gambar_1) }}" 
            alt="{{ $review->judul }}"
            style="max-width: 400px; display: block; margin-bottom: 20px;"
        >
        @endif

        <p><strong>Penjelasan:</strong></p>
        <p>{{ $review->paragraf_jelaskan }}</p>

        <p><strong>Penutup:</strong></p>
        <p>{{ $review->paragraf_tutup }}</p>

        @if($review->gambar_2)
            <img src="{{ asset(path: 'storage/' . $review->gambar_2) }}" width="300">
        @endif
    @endforeach
@endif

</body>
</html>
