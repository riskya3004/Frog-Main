<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\PaymentDetail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isEmpty;

class MyEventController extends Controller
{
    //
    public function index(){
        // dd(auth()->user()->id);
        $i = auth()->user()->id;
        // $currentDate = Carbon::now()->toDateString();
        $ongoings = Event::where('user_id', $i)
        ->where('status', 'accepted')
        ->get();

        $waitings = Event::where('user_id', $i)
        ->where('status', 'waiting')
        ->get();

        $finisheds = Event::where('user_id', $i)
        ->where('status', 'finished')
        ->get();

        $rejecteds = Event::where('user_id', $i)
        ->where('status', 'rejected')
        ->get();

        return view('myevents', [
            'ongoings' => $ongoings,
            'waitings' => $waitings,
            'finisheds' => $finisheds,
            'rejecteds' => $rejecteds
        ]);

    }

    public function show(Event $event, $isEdit){
        // $event = Event::find(1);
        $start = new \DateTime($event->start_date);
        $end = new \DateTime($event->end_date);
        $rn = new \DateTime();

        // //tanggal start nya graph
        $graph_start = $start->format('Y-m-d');
        $graph_start = new \DateTime($graph_start);

        //produk yang dimiliki event tsb
        $products = Product::all()->where('event_id', $event->id);
        //pembayaran pembayaran terkait event ini
        $this_payment = PaymentDetail::whereHas('product', function($p) use ($event){
            $p->where('event_id', $event->id);
        });

        //cari sum total dan modal per payment header
        $total = $this_payment
        ->addselect(PaymentDetail::raw('SUM(qty * item_price) as total'))
        ->addselect(PaymentDetail::raw('SUM(qty * item_modal) as modal'))
        ->groupBy('payment_header_id')
        ->get();

        //kelompokkan transaksi terkait event ini. Alasan dimerge sama p header adalah kita pengen grup berdasar user id nya
        $user_count = PaymentDetail::join('payment_headers', 'payment_details.payment_header_id', '=', 'payment_headers.id')
        ->whereHas('product', function($p) use ($event){
            $p->where('event_id', $event->id);
        })
        ->get();

        //mencari total pemasukan per hari
        $user_total = PaymentDetail::join('payment_headers', 'payment_details.payment_header_id', '=', 'payment_headers.id')
        ->addselect(PaymentDetail::raw('SUM(qty * item_price) as total'))
        ->addselect('date')
        ->whereHas('product', function($p) use ($event){
            $p->where('event_id', $event->id);
        })
        ->groupBy('date')
        ->get();

        //mencari top product
        // $top = PaymentDetail::
        // addselect(PaymentDetail::raw('SUM(qty) as quantity'))
        // ->addselect(PaymentDetail::raw('product_id as pid'))
        // ->whereHas('product', function($p) use ($event){
        //     $p->where('event_id', $event->id);
        // })
        // ->groupBy('product_id')
        // ->get();



        $pd = PaymentDetail::select('products.name')
            ->join('products', 'products.id', '=', 'payment_details.product_id')
            ->join('events', 'events.id', '=', 'products.event_id')
            ->where('events.id', '=', $event->id)
            ->get();

        if($pd->count() > 0) {
            // Jika sudah ada penjualan
            $top = PaymentDetail::select('products.name', DB::raw("SUM(payment_details.qty) as SUM"))
                ->join('products', 'products.id', '=', 'payment_details.product_id')
                ->join('events', 'events.id', '=', 'products.event_id')
                ->where('events.id', '=', $event->id)
                ->groupBy('products.id')
                ->orderBy('SUM', 'DESC')
                ->take(1)
                ->get();

            // SELECT e.name, p.name, SUM(pd.qty) as total
            // FROM payment_details pd JOIN products p ON pd.product_id = p.id
            // JOIN events e ON e.id = p.event_id
            // WHERE e.id = 1
            // GROUP BY p.id
            // ORDER BY total DESC

            $paymentDetail = $top[0];
            $top = $paymentDetail->name;

        } else {
            // jika blom ada penjualan sama sekali pada event itu
            $top = '-';

        }




        // dd($top);

        // $events = Event::select('events.*', DB::raw("SUM(payment_details.qty) as SUM"))
        // ->join('products', 'events.id', '=', 'products.event_id')
        // ->join('payment_details', 'products.id', '=', 'payment_details.product_id')
        // ->where('events.status', '=', 'accepted')
        // ->groupBy('events.id')
        // ->orderBy('SUM', 'DESC')
        // ->take(10)
        // ->get();


        // if(!isEmpty($top)){

        // dd($top->where('quantity', $top->max('quantity')));
        // if(($top->isNotEmpty())){

        // if(!isEmpty($top)){
        //     $top = $top->where('quantity', $top->max('quantity'));
        //     $top = Product::find($top[0]['pid']);
        // }

        // dd(!empty($top));
        // if (!isEmpty($top)) {
        // if ($top->isNotEmpty()) {
        //     $top = $top->where('quantity', $top->max('quantity'));
        //     $top = Product::find($top[0]['pid']);
        // }

        // dd(is_int(count($top)))

        // @dd(count($top));

        // @dump(count($top))


        // if(count($top)){
        //     $top = $top->where('quantity', $top->max('quantity'));
        //     $top = Product::find($top[0]['pid']);

        // }



        $pg = 1;
        $count = count($products);
        $products = $products->load('event');
        $products = $products->take(9);
        //jika panjang smua kurang dari atau sama dengan 25, maka $pg = -1
        if($count <= 9) $pg = -1;

        $namacat = "-";

        // dump($histories);

        return response(view('myEventDetail', [
            'event' => $event,
            'start' => $start,
            'end' => $end,
            'rn' => $rn,
            'products' => $products,
            'total' => $total,
            'user_total' => $user_total,
            'user_count' => $user_count,
            'top' => $top,
            'graph_start' => $graph_start,
            'isEdit' => $isEdit,
            'pg' => $pg,
            'namacat' => $namacat
        ]));

    }

    public function showProductDetail(Request $request, Event $event)
    {
        // kalo pencet see more
        // dump('masok');
        $products = Product::where('event_id', $event->id)->get();

        $pg = (int)$request->input('pg');
        $pge = 10*$pg;
        $pge = $pge-1;
        $c = count($products);
        $products = $products->load('event');
        if($pge >= $c)$pg = -1;

        return view('myProductsResult', [
            'products' => $products->take($pge),
            'pg' => $pg,
            'event' => $event
        ]);

    }

    public function history(Event $event){

        $histories = PaymentDetail::whereHas('product', function($p) use ($event){
            $p->where('event_id', $event->id);
        })->get();

        // $histories = PaymentDetail::all();

        return view('allHistory', [
            'histories' => $histories
        ]);
    }

    public function edit(Request $request, Event $event){
        $event->name = $request->input('new-name');
        $event->description = $request->input('new-caption');
        $event->save();

        $url = '/myEventDetail'.'/'.$event->id.'/0';

        return redirect($url)->with('success', 'Events updated successfully');
    }
}
